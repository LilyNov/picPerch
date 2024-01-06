import React, { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { FileUploaderProps } from "./fileUploader.types";
import { CREATE_MODE } from "@/constants/constants";
import { EditFile } from "./components/EditFile";
import { DragZone } from "./components/DragZone";

export const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const { mode, fieldChange, mediaUrl, isEditMode } = props;

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
    disabled: isEditMode,
  });

  const imgSrc = mode === CREATE_MODE ? fileUrl : mediaUrl;
  const dragZoneBgColor = isDragActive ? "bg-primary-400" : "bg-white";

  return (
    <div {...getRootProps()} className={`drop-zone-root ${dragZoneBgColor}`}>
      <input {...getInputProps()} className="cursor-pointer" />

      {imgSrc ? (
        <EditFile imgSrc={imgSrc} isEditMode={isEditMode} />
      ) : (
        <DragZone isDragActive={isDragActive} />
      )}
    </div>
  );
};
