import { Link } from "react-router-dom";
import { PostCardProps } from "../postCardTypes";
import { multiFormatDateString } from "@/lib/utils";

export const PostCreator: React.FC<PostCardProps> = (props) => {
  const { post } = props;

  return (
    <>
      {post?.creator && (
        <Link
          to={`/profile/${post?.creator?.$id}`}
          className="flex items-center gap-3">
          <img
            src={post?.creator?.imageUrl}
            alt="avatar"
            className="rounded-full w-12 lg:h-12"
          />
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold ">{post?.creator.name}</p>
            <div className="flex-center gap-2 text-light-2 subtle-semibold lg:small-regular">
              <p>
                {multiFormatDateString(post?.$createdAt)} -{post?.location}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
