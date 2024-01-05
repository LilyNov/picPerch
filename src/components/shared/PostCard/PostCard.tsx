import React from "react";
import { PostCardProps } from "./postCardTypes";
import { Link } from "react-router-dom";

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post?.creator?.$id}`}>
            <img
              src={post?.creator?.imageUrl}
              alt="avatar"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold ">{post?.creator.name}</p>
            <div className="flex-center gap-2 text-light-2">
              <p className="subtle-semibold lg:small-regular">
                {post.$createdAt}
              </p>
              -<p>{post?.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
