import { PostCard } from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

export const Home = () => {
  const { data: posts, isPending, isError } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Home feed</h2>
        {isPending && !posts ? (
          <>skeleton</>
        ) : (
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.documents.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
