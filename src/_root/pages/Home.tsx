import { PostCard } from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { IPost } from "@/types/types";

export const Home = () => {
  const { data, isPending, isError } = useGetRecentPosts();
  const posts = data?.documents || [];

  return (
    <div className="flex flex-1">
      <div className="home-container">
        {!isPending && posts ? (
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts.map((post) => (
              <PostCard key={post.$id} post={post as IPost} />
            ))}
          </ul>
        ) : (
          <>skeleton</>
        )}
      </div>
    </div>
  );
};
