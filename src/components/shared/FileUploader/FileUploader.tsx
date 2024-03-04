import React, { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { partial } from "filesize";

import { FileUploaderProps } from "./fileUploader.types";
import { CREATE_MODE, validPhotoExtensions } from "@/constants/constants";
import { EditFile } from "./components/EditFile";
import { DragZone } from "./components/DragZone";

export const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const { mode, fieldChange, mediaUrl, isEditMode } = props;
  const size = partial({ standard: "jedec" });

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

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      disabled: isEditMode,
      maxFiles: 1,
      validator: (file) => {
        const maxLengthOfFileName = 80;
        const maxFileSize = 25000000;

        if (file.name.length > maxLengthOfFileName) {
          return {
            code: "name-too-large",
            message: `Name is larger than ${maxLengthOfFileName} characters`,
          };
        } else if (file.size > maxFileSize) {
          return {
            code: "size-too-large",
            message: "The file larger than 25 MB",
          };
        } else if (
          file.type &&
          !validPhotoExtensions.includes(file.type.split("/")[1])
        ) {
          return {
            code: "file-invalid-type",
            message: `The extension is not valid`,
          };
        } else if (!file.type) {
          const splittedFileName = file.name.split(".");
          const fileTypeFromName =
            splittedFileName[splittedFileName.length - 1];
          if (!file.type && !validPhotoExtensions.includes(fileTypeFromName)) {
            return {
              code: "file-invalid-type",
              message: `The extension is not valid`,
            };
          }
        }

        return null;
      },
    });
  console.log(fileRejections);

  const imgSrc = mode === CREATE_MODE ? fileUrl : mediaUrl;
  const dragZoneBgColor = isDragActive ? "bg-primary-400" : "bg-white";
  const borderBoxStyle = !fileRejections.length
    ? "border-none"
    : "border border-dashed border-red";

  return (
    <>
      <div
        {...getRootProps()}
        className={`drop-zone-root  ${dragZoneBgColor} ${borderBoxStyle}`}>
        <input {...getInputProps()} className="cursor-pointer" />

        {imgSrc ? (
          <EditFile imgSrc={imgSrc} isEditMode={isEditMode} />
        ) : (
          <>
            <DragZone isDragActive={isDragActive} />
            <p className="small-regular mb-6 text-light-2">
              Maximum upload file size 25MB
            </p>
          </>
        )}
      </div>

      {fileRejections.map(({ file, errors }, idx) => {
        return (
          <div key={idx}>
            {errors.map(({ code, message }) => {
              if (code === "too-many-files") {
                if (idx === 0) {
                  return (
                    <p key={code} className="small-regular mb-6 text-red">
                      Maximum 1 photo can be attached
                    </p>
                  );
                }
              } else {
                return (
                  <p key={code} className="small-regular mb-6 text-red">
                    {`${file.name} (${size(file.size)}) - ${message}`}
                  </p>
                );
              }

              return null;
            })}
          </div>
        );
      })}
    </>
  );
};
