import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { GridPostList, SearchResults } from "@/components/modules/explorePage";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { IGetPostsData, IPageData } from "@/lib/react-query/queries.types";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { Loader } from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";

export const Explore = () => {
  const { ref, inView } = useInView();
  const { user } = useUserContext();

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500);
  const { data: searched, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  const { data, fetchNextPage, hasNextPage } = useGetPosts();
  const posts = data as IGetPostsData;
  const searchedPosts = searched as IPageData;

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = !!searchQuery;
  const shouldShowPosts =
    !searchQuery && posts?.pages.every((item) => item?.documents.length === 0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-off-white">
          <img src="/assets/icons/search.svg" alt="search" />
          <Input
            type="text"
            placeholder="Search..."
            className="explore-search"
            value={searchQuery}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Popular today</h3>

          <div className="flex-center gap-3 bg-off-white rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-3">All</p>
            <img src="/assets/icons/filter.svg" alt="filter" />
          </div>
        </div>

        <div className="flex flex-wrap gap-9 max-w-5xl">
          {shouldShowSearchResults ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : shouldShowPosts ? (
            <p className="text-light-4 mt-10 text-center w-full">
              End of posts
            </p>
          ) : (
            posts?.pages.map((item, index) => (
              <GridPostList
                key={`page-${index}`}
                posts={item?.documents}
                userId={user.id}
              />
            ))
          )}
        </div>

        {hasNextPage && !searchQuery && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};
