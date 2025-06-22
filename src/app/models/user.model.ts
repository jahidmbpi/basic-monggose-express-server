import { model, Schema } from "mongoose";
import { Iuser } from "../interface/user.Interface";

const userSchema = new Schema<Iuser>({
  fristName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
export const User = model("user", userSchema);
