import React from "react";
import { SavePostProps } from "../postCardTypes";

export const SavePost: React.FC<SavePostProps> = (props) => {
  const { isSaved, savePostHandler } = props;

  const currentImg = isSaved
    ? "/assets/icons/saved.svg"
    : "/assets/icons/save.svg";

  return (
    <img
      src={currentImg}
      alt="like"
      className="w-6 cursor-pointer"
      onClick={savePostHandler}
    />
  );
};
