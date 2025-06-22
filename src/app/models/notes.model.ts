import { model, Schema } from "mongoose";
import { INote } from "../interface/notes.interface";

const noteSchema = new Schema<INote>({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  catagory: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});

export const Note = model("Note", noteSchema);
