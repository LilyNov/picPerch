import { EditFileProps } from "../fileUploader.types";

export const EditFile: React.FC<EditFileProps> = ({ imgSrc, isEditMode }) => {
  return (
    <>
      <div className="flex flex-1 justify-center w-1000 p-5 lg:p-10">
        <img src={imgSrc} alt="image" className="file_uploader-img" />
      </div>
      {!isEditMode && (
        <p className="file_uploader-label">Click or drag photo to replace</p>
      )}
    </>
  );
};
