import { PostCardProps } from "./postCardTypes";
import { useUserContext } from "@/context/AuthContext";
import { PostCreator, PostDescription, PostStats } from "./components";
import { Link } from "react-router-dom";
import { isCurrentUserCreator } from "@/helpers/helpers";

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useUserContext();

  return (
    <div className="post-card">
      {/* post creator */}
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <PostCreator post={post} />
        </div>

        {isCurrentUserCreator(user.id, post?.creator?.$id) && (
          <Link to={`/update-post/${post?.$id}`}>
            <img src="/assets/icons/edit-post.svg" alt="edit" className="w-8" />
          </Link>
        )}
      </div>

      {/* post description */}
      <Link to={`/posts/${post?.$id}`}>
        <PostDescription post={post} />
      </Link>

      {/* image */}
      <Link to={`/posts/${post?.$id}`}>
        <img src={post?.imageUrl} alt="image" className="post_card-img" />
      </Link>

      {/* post statistics */}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};
