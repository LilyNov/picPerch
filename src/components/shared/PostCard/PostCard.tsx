import { PostCardProps } from "./postCardTypes";
import { useUserContext } from "@/context/AuthContext";
import { PostCreator, PostDescription, PostStats } from "./components";
import { Link } from "react-router-dom";
import { isCurrentUserCreator } from "@/helpers/helpers";

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useUserContext();
  console.log("Add skeleton image if something wrong with image ");

  return (
    <div className="post-card">
      {/* post creator */}
      <PostCreator
        post={post}
        isCurrentUserCreator={isCurrentUserCreator(user.id, post?.creator?.$id)}
      />

      {/* post description */}
      <PostDescription post={post} />

      {/* image */}
      <Link to={`/posts/${post?.$id}`}>
        <img src={post?.imageUrl} alt="image" className="post_card-img" />
      </Link>

      {/* post statistics */}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};
