import React from "react";
import { GridPostListProps } from "./explorePage.types";
import { PostCardWithInfo } from "@/components/shared/PostCardWithInfo";

export const GridPostList: React.FC<GridPostListProps> = (props) => {
  const { posts, userId, showUser = true, showStats = true } = props;

  return (
    <ul className="grid-container">
      <PostCardWithInfo
        posts={posts}
        userId={userId}
        showUser={showUser}
        showStats={showStats}
      />
    </ul>
  );
};
