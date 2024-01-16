import { IPost } from "@/types/types";

export interface PostCardProps {
  post: IPost;
}

export interface PostStatsProps extends PostCardProps {
  userId: string;
  invertWhite?: boolean;
}

export interface LikePostProps {
  userId: string;
  likes: string[];
  invertWhite?: boolean;
  handleLikePost: (e: React.MouseEvent) => void;
}

export interface SavePostProps {
  isLoading: boolean;
  invertWhite?: boolean;
  isSaved: boolean;
  handleSavePost: (e: React.MouseEvent) => void;
}
