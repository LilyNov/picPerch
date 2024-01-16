import { IPost } from "@/types/types";
import { Models } from "appwrite";

export interface SearchResultsProps {
  isSearchFetching: boolean;
  searchedPosts?: Models.DocumentList<Models.Document>;
}

export interface GridPostListProps {
  posts?: IPost[];
  userId?: string;
  showUser?: boolean;
  showStats?: boolean;
}
