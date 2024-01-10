import { IPost } from "@/types/types";

export interface IPageData {
  total: number;
  documents: IPost[];
}

export interface IGetPostsData {
  pageParams: string[];
  pages: IPageData[];
}
