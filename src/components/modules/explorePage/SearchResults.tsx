import { Loader } from "@/components/shared/PostCard/Loader/Loader";
import { GridPostList } from "./GridPostList";
import { SearchResultsProps } from "./explorePage.types";

export const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const { isSearchFetching, searchedPosts } = props;
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};
