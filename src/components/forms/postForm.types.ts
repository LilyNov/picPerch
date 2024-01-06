import { Mode } from "@/types/types";
import { Models } from "appwrite";

export interface PostFormProps {
  mode: Mode;
  post?: Models.Document;
}
