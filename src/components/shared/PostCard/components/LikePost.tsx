import { checkIsLiked } from "@/lib/utils";
import { LikePostProps } from "../postCardTypes";
import React from "react";

export const LikePost: React.FC<LikePostProps> = React.memo((props) => {
  const { userId, invertWhite, likes, handleLikePost } = props;
  const textColor = invertWhite ? "text-off-white" : "";

  const currentImg = checkIsLiked(likes, userId)
    ? "/assets/icons/liked.svg"
    : "/assets/icons/like.svg";

  return (
    <div className="flex gap-2 mr-5">
      <img
        src={currentImg}
        alt="like"
        className="w-6 cursor-pointer"
        onClick={handleLikePost}
      />
      <p className={`small-medium lg:base-medium ${textColor}`}>
        {likes.length}
      </p>
    </div>
  );
});
