import { Types } from "mongoose";

export interface INote {
  title: string;
  content?: string;
  catagory?: "personal" | "work" | "study" | "other";
  pinned?: boolean;
  tags?: {
    label: string;
    color?: string;
  };
  userId: Types.ObjectId;
}
