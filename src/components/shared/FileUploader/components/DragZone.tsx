import { Button } from "@/components/ui/button";
import { DragZoneProps } from "../fileUploader.types";

export const DragZone: React.FC<DragZoneProps> = ({ isDragActive }) => {
  const textColor = isDragActive ? "invert-white" : "text-light-2";

  return (
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
  );
};
