import { PostCardProps } from "../postCardTypes";

export const PostDescription: React.FC<PostCardProps> = ({ post }) => {
  return (
    <>
      <p className="small-medium lg:base-regular pt-6">{post?.caption}</p>
      <ul className="flex gap-1 mt-2">
        {post?.tags?.map((tag) => (
          <li key={tag} className="text-light-3 ">
            #{tag.toLocaleLowerCase()}
          </li>
        ))}
      </ul>
    </>
  );
};
