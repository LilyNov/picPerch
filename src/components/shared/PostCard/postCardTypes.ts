import { IPost } from "@/types/types";

export interface PostCardProps {
  post: IPost;
}

export interface PostCreatorProps extends PostCardProps {
  isCurrentUserCreator: boolean;
}

export interface LikePostProps {
  userId: string;
  likes: string[];
  likePostHandler: (e: React.MouseEvent) => void;
}

export interface SavePostProps {
  isSaved: boolean;
  savePostHandler: (e: React.MouseEvent) => void;
}
