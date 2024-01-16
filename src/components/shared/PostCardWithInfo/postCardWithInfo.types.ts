import { IPost } from "@/types/types";

export interface PostCardWithInfoProps {
  posts?: IPost[];
  userId?: string;
  showUser?: boolean;
  showStats?: boolean;
}
