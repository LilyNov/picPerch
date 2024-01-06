import { PostForm } from "@/components/forms";
import { IParams } from "@/types/types";
import { useParams } from "react-router-dom";

export const CreateEditPost = () => {
  const { id } = useParams<IParams>();

  const isEditPage = !!id;
  const mode = isEditPage ? "Edit" : "Create";

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/post-add.svg"
            alt="add post"
            className="w-9"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">{`${mode} Post`}</h2>
        </div>

        <PostForm mode={mode} />
      </div>
    </div>
  );
};