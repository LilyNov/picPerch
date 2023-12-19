import { ID, Query } from "appwrite";
import { INewUser } from "@/types/types";
import { account, appwriteConfig, avatars, databases } from "./config";

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

// GET account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

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
