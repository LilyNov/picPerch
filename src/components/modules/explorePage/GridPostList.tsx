import React from "react";
import { GridPostListProps } from "./explorePage.types";
import { Link } from "react-router-dom";

export const GridPostList: React.FC<GridPostListProps> = ({ posts }) => {
  return (
    <ul className="grid-container">
      {posts?.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post?.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="image"
              className="w-full h-full object-cover"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
