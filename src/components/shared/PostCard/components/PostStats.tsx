import { useEffect, useState } from "react";
import { Models } from "appwrite";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { PostStatsProps } from "../postCardTypes";
import { LikePost } from "./LikePost";
import { SavePost } from "./SavePost";

export const PostStats: React.FC<PostStatsProps> = (props) => {
  const { post, userId } = props;

  const { mutate: likePostM } = useLikePost();
  const { mutate: savePostM, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPostM, isPending: isDeletingPost } =
    useDeleteSavedPost();

  const { data: currentUserPostsQ } = useGetCurrentUser();

  const likesListUserId = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesListUserId);
  const [isSaved, setIsSaved] = useState(false);

  const getSavedPost = currentUserPostsQ?.save.find(
    (savedPost: Models.Document) => savedPost.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!getSavedPost);
  }, [currentUserPostsQ]);

  const likePostHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    let updatedLikes = [...likes];
    const hasLiked = updatedLikes.includes(userId);

    if (hasLiked) {
      updatedLikes = updatedLikes.filter((id) => userId !== id);
    } else {
      updatedLikes.push(userId);
    }

    setLikes(updatedLikes);
    likePostM({ postId: post.$id, likesArray: updatedLikes });
  };

  const savePostHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSaved) {
      setIsSaved(false);
      deleteSavedPostM(getSavedPost.$id);
    } else {
      savePostM({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <LikePost
        likePostHandler={likePostHandler}
        likes={likes}
        userId={userId}
      />
      <SavePost
        savePostHandler={savePostHandler}
        isSaved={isSaved}
        isLoading={isSavingPost || isDeletingPost}
      />
    </div>
  );
};
