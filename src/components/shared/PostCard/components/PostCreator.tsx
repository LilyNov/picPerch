import { Link } from "react-router-dom";
import { PostCreatorProps } from "../postCardTypes";
import { multiFormatDateString } from "@/lib/utils";

export const PostCreator: React.FC<PostCreatorProps> = (props) => {
  const { post, isCurrentUserCreator } = props;

  return (
    <div className="flex-between">
      <div className="flex items-center gap-3">
        {post.creator && (
          <Link to={`/profile/${post?.creator?.$id}`}>
            <img
              src={post?.creator?.imageUrl}
              alt="avatar"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
        )}

        <div className="flex flex-col">
          <p className="base-medium lg:body-bold ">{post?.creator.name}</p>
          <div className="flex-center gap-2 text-light-2 subtle-semibold lg:small-regular">
            <p>{multiFormatDateString(post.$createdAt)}</p>-
            <p>{post?.location}</p>
          </div>
        </div>
      </div>

      {isCurrentUserCreator && (
        <Link to={`/update-post/${post.$id}`}>
          <img src="/assets/icons/edit-post.svg" alt="edit" className="w-8" />
        </Link>
      )}
    </div>
  );
};
