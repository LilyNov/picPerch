import { checkIsLiked } from "@/lib/utils";
import { LikePostProps } from "../postCardTypes";
import React from "react";

export const LikePost: React.FC<LikePostProps> = React.memo((props) => {
  const { likePostHandler, likes, userId } = props;

  const currentImg = checkIsLiked(likes, userId)
    ? "/assets/icons/liked.svg"
    : "/assets/icons/like.svg";

  return (
    <div className="flex gap-2 mr-5">
      <img
        src={currentImg}
        alt="like"
        className="w-6 cursor-pointer"
        onClick={likePostHandler}
      />
      <p className="small-medium lg:base-medium">{likes.length}</p>
    </div>
  );
});
