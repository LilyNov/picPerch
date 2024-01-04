import React, { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../../ui/button";
import { FileUploaderProps } from "./fileUploader.types";

export const FileUploader: React.FC<FileUploaderProps> = ({
  fieldChange,
  mediaUrl,
}) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", "jpeg", ".jpg", ".svg"],
    },
  });
  const textColor = isDragActive ? "invert-white" : "text-light-2";

  return (
    <div
      {...getRootProps()}
      className={`drop-zone-root ${
        isDragActive ? "bg-primary-400" : "bg-white"
      }`}>
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-1000 p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="add post"
            className={`w-12 mb-6 ${
              isDragActive ? "invert-white" : "invert-light-2"
            }`}
          />
          <h3 className={`base-medium mb-2 ${textColor}`}>
            Please drag your photo here
          </h3>
          <p className={`small-regular mb-6 ${textColor}`}>JPG, SVG, PNG</p>

          <Button
            className={`${
              isDragActive ? "shad-button_primary" : "shad-button_light-2"
            }`}>
            Select
          </Button>
        </div>
      )}
    </div>
  );
};
