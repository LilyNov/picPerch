import React from "react";
import { Link } from "react-router-dom";
import { PostCardWithInfoProps } from "./postCardWithInfo.types";
import { PostStats } from "../PostCard/components";

export const PostCardWithInfo: React.FC<PostCardWithInfoProps> = (props) => {
  const { posts, userId, showUser = true, showStats = true } = props;
  const shouldRenderUserInfo = (showUser || showStats) && userId;

  return (
    <>
      {posts?.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post?.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="image"
              className="w-full h-full object-cover"
            />
          </Link>

          {shouldRenderUserInfo && (
            <div className="grid-post_user">
              {showUser && (
                <div className="flex-start gap-2 flex-1">
                  {post.creator.imageUrl && (
                    <img
                      src={post.creator.imageUrl}
                      alt="user image"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <p className="line-clamp-1 text-light-2">
                    {post.creator.name}
                  </p>
                </div>
              )}

              {showStats && (
                <PostStats userId={userId} post={post} invertWhite />
              )}
            </div>
          )}
        </li>
      ))}
    </>
  );
};
