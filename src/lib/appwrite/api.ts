import { ID, Query } from "appwrite";
import { INewPost, INewUser, IUpdatePost } from "@/types/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

//------------user-------------
// create a new user account
export const createUserAccount = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
      username: user.username,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// add a new user account to the DB

export const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) => {
  try {
    const newUser = databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

// sig in Account (+ add user for user in the DB)
export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const session = account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
};

// sign out

export const signOutAccount = async () => {
  try {
    // provided by appwrite lib
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
};

// for checkAuthUser (AuthContext)

// ! GET account
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
};

// check current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw new Error();

    const currentUser = databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error();

    return (await currentUser).documents[0];
  } catch (error) {
    console.log(error);
  }
};

// ----------- POSTS---------------

// * CREATE POST
export const createPost = async (post: INewPost) => {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error("Failed to create post");

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error("Failed to create post");
    }

    // Convert tags into an array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const newPostObject = {
      creator: post.userId,
      caption: post.caption,
      imageUrl: fileUrl,
      imageId: uploadedFile.$id,
      location: post.location,
      tags: tags,
    };

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      newPostObject
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error("Failed");
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
};

// UPLOAD FILE
export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

// GET FILE URL
export const getFilePreview = (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000, //width
      2000, //hight
      "top", //place
      100 //quality
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};

//  DELETE FILE
export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

// * GET RECENT POSTS

export const getRecentPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
};

// * INTERACTION with posts

// like
export const likePost = async (postId: string, likesArray: string[]) => {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

// save
export const savePost = async (postId: string, userId: string) => {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

// delete saved
export const deleteSavedPost = async (savedPostId: string) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedPostId
    );

    if (!statusCode) throw Error;

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

// * UPDATE / DELETE POST
// get post by id
export const getPostById = async (postId: string) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (post: IUpdatePost) => {
  const hasFileToUpdate = post.file.length > 0;
  const { imageUrl, imageId, postId, caption, location } = post;

  try {
    let image = {
      imageUrl,
      imageId,
    };

    if (hasFileToUpdate) {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);

      if (!uploadedFile) throw Error;

      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);

      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into an array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Save updated post
    const updatedPostObject = {
      caption,
      imageUrl: image.imageUrl,
      imageId: image.imageId,
      location,
      tags,
    };

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      updatedPostObject
    );

    if (!updatedPost) {
      await deleteFile(imageId);
      throw Error;
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string, imageId: string) => {
  if (!postId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

// * GET POSTS
export const getInfinitePosts = async ({ pageParam }: { pageParam: any }) => {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error("Failed to fetch posts");

    return posts;
  } catch (error) {
    console.log(error);
  }
};

// * SEARCH POSTS
export const searchPosts = async (searchQuery: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchQuery)]
    );

    if (!posts) throw Error("Failed to fetch posts");

    return posts;
  } catch (error) {
    console.log(error);
  }
};
