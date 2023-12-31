import { PostCardProps } from "./postCardTypes";
import { useUserContext } from "@/context/AuthContext";
import { PostCreator, PostDescription, PostStats } from "./components";

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useUserContext();
  const isCurrentUserCreator = user.id === post?.creator?.$id;
  console.log("Add skeleton image if something wrong with image ");

  return (
    <div className="post-card">
      {/* post creator */}
      <PostCreator post={post} isCurrentUserCreator={isCurrentUserCreator} />

      {/* post description */}
      <PostDescription post={post} />

      {/* image */}
      <img src={post.imageUrl} alt="image" className="post-card_img" />

      {/* post statistics */}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};
