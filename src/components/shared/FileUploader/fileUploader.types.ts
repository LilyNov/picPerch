import { Mode } from "@/types/types";

export interface FileUploaderProps {
  mode: Mode;
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
  isEditMode: boolean;
}

export interface EditFileProps {
  imgSrc: string;
  isEditMode: boolean;
}

export interface DragZoneProps {
  isDragActive: boolean;
}
