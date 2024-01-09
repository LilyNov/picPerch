import { IPost } from "@/types/types";

export interface PostCardProps {
  post: IPost;
}

export interface PostStatsProps extends PostCardProps {
  userId: string;
}

export interface LikePostProps {
  userId: string;
  likes: string[];
  handleLikePost: (e: React.MouseEvent) => void;
}

export interface SavePostProps {
  isLoading: boolean;
  isSaved: boolean;
  handleSavePost: (e: React.MouseEvent) => void;
}
