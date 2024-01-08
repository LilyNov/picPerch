import { PostCreator } from "@/components/shared/PostCard/components";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { isCurrentUserCreator } from "@/helpers/helpers";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { IParams, IPost } from "@/types/types";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const PostDetails = () => {
  const { id } = useParams<IParams>();
  const { user } = useUserContext();

  const { data: post, isPending } = useGetPostById(id, false);

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="image" className="post_details-img" />

          <div className="p-5 flex flex-between w-full">
            <PostCreator post={post as IPost} />

            {isCurrentUserCreator(user.id, post?.creator?.$id) && (
              <div className="flex-center gap-4">
                <Link to={`/update-post/${post?.$id}`} className="p-1">
                  <img
                    src="/assets/icons/edit-post.svg"
                    alt="edit"
                    className="w-6"
                  />
                </Link>
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
        </div>
      )}
    </div>
  );
};
