import { IPost } from "@/types/types";

export interface PostCardProps {
  post: IPost;
  isCurrentUserCreator?: boolean;
}
