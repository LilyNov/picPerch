import { useState } from "react";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { PostCardProps } from "../postCardTypes";
import { LikePost } from "./LikePost";
import { SavePost } from "./SavePost";

export const PostStats: React.FC<PostCardProps> = ({ post }) => {
  const { mutate: likePostM } = useLikePost();
  const { mutate: savePostM } = useSavePost();
  const { mutate: deleteSavedPostM } = useDeleteSavedPost();

  const { user } = useUserContext();
  const userId = user.id;

  const likesListUserId = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesListUserId);
  const [isSaved, setIsSaved] = useState(false);

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
  };

  return (
    <div className="flex justify-between items-center z-20">
      <LikePost
        likePostHandler={likePostHandler}
        likes={likes}
        userId={user.id}
      />
      <SavePost savePostHandler={savePostHandler} isSaved={isSaved} />
    </div>
  );
};
