import React from "react";
import { SavePostProps } from "../postCardTypes";
import { Loader } from "../../Loader";

export const SavePost: React.FC<SavePostProps> = React.memo((props) => {
  const { isLoading, isSaved, handleSavePost } = props;

  const currentImg = isSaved
    ? "/assets/icons/saved.svg"
    : "/assets/icons/save.svg";

  return (
    <div className="flex gap-2">
      {isLoading ? (
        <Loader />
      ) : (
        <img
          src={currentImg}
          alt="like"
          className="w-6 cursor-pointer"
          onClick={handleSavePost}
        />
      )}
    </div>
  );
});
