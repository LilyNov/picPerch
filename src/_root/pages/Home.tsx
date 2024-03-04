import { Loader } from "@/components/shared/Loader";
import { PostCard } from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { IPost } from "@/types/types";

const Home = () => {
  const { data, isPending } = useGetRecentPosts();
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
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Home;
