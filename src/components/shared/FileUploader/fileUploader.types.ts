import { Mode } from "@/types/types";

export interface FileUploaderProps {
  mode: Mode;
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}
