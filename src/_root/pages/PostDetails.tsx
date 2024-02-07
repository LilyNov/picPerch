import { Loader } from "@/components/shared/PostCard/Loader";
import {
  PostCreator,
  PostDescription,
  PostStats,
} from "@/components/shared/PostCard/components";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { isCurrentUserCreator } from "@/helpers/helpers";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { IParams, IPost } from "@/types/types";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<IParams>();
  const { user } = useUserContext();

  const { data: post, isPending } = useGetPostById(id, false);
  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    if (id && post)
      deletePost(
        { postId: id, imageId: post.imageId },
        { onSuccess: () => navigate(-1) }
      );
  };

  if (isPending && !post) return <Loader />;

  return (
    <div className="post_details-container">
      <div className="post_details-card">
        <img src={post?.imageUrl} alt="image" className="post_details-img" />

        <div className="post_details-info">
          <div className="flex-between w-full">
            <PostCreator post={post as IPost} />

            {isCurrentUserCreator(user.id, post?.creator?.$id) && (
              <div className="flex-center gap-7">
                {/* edit post */}
                <Link to={`/update-post/${post?.$id}`} className="p-1">
                  <img
                    src="/assets/icons/edit-post.svg"
                    alt="edit"
                    className="w-6"
                  />
                </Link>

                {/* delete post */}
                <Button
                  variant="ghost"
                  onClick={handleDeletePost}
                  className="p-1">
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    className="w-6"
                  />
                </Button>
              </div>
            )}
          </div>

          {/* post description and stats */}
          <div className="divide-line" />
          <div className="flex flex-col flex-1 w-full">
            <PostDescription post={post as IPost} />
          </div>

          <div className="w-full">
            <PostStats userId={user.id} post={post as IPost} />
          </div>
        </div>
      </div>
    </div>
  );
};
