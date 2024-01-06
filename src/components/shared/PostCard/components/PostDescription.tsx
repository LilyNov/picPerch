import { PostCardProps } from "../postCardTypes";
import { Link } from "react-router-dom";

export const PostDescription: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.$id}`}>
      <p className="small-medium lg:base-medium py-5">{post.caption}</p>
      <ul className="flex gap-1 mt-2">
        {post.tags?.map((tag) => (
          <li key={tag} className="text-light-3 ">
            #{tag.toLocaleLowerCase()}
          </li>
        ))}
      </ul>
    </Link>
  );
};
