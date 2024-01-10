import { Models } from "appwrite";

export interface SearchResultsProps {
  isSearchFetching: boolean;
  searchedPosts?: Models.DocumentList<Models.Document>;
}

export interface GridPostListProps {
  posts?: Models.Document[];
}
