import { IPageData } from "@/lib/react-query/queries.types";
import { IPost } from "@/types/types";

export interface SearchResultsProps {
  isSearchFetching: boolean;
  searchedPosts?: IPageData;
}

export interface GridPostListProps {
  posts?: IPost[];
  userId?: string;
  showUser?: boolean;
  showStats?: boolean;
}
