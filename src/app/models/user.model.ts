import bcrypt from "bcryptjs";
import { UserInstanceMethods } from "./../interface/user.Interface";
import { Model, model, Schema } from "mongoose";
import { Iuser } from "../interface/user.Interface";

const userSchema = new Schema<Iuser, Model<Iuser>, UserInstanceMethods>({
  fristName: {
    type: String,
    trim: true,
    required: true,
    min: [5, "fristname must be atlest 5 charecter,got {VALUE}"],
    max: [10, "frist name hbe higesht 10, got {VALUE}"],
    //coustom validator
    validate: {
      validator: function (v: string) {
        return /^[A-Za-z\s]{3,10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid name! Name must be 3 to 10 characters long and contain only letters and spaces.`,
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    min: [5, "Must be at least 6, got {VALUE}"],
    max: [10, "Must be at least 6, got {VALUE}"],
    validate: {
      validator: function (v: string) {
        return /^[A-Za-z\s]{3,10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid name! Name must be 3 to 10 characters long and contain only letters and spaces.`,
    },
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Must be at least 6, got {VALUE}"],
    max: [60, "Must be at least 6, got {VALUE}"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    //coustom validator
    validate: {
      validator: function (v: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    uppercase: true,
    enum: {
      values: ["USER", "ADMIN", "AUPERADMIN"],
      message: "role is not valid got role is {VALUE}",
    },
    //coustom validator
    validate: {
      validator: function (v: string) {
        const allowedRoles = ["USER", "ADMIN", "AUPERADMIN"];
        return allowedRoles.includes(v.toUpperCase());
      },
      message: (props) =>
        `${props.value} is not a valid role! Must be one of USER, ADMIN or AUPERADMIN.`,
    },
    default: "USER",
  },
});

userSchema.method("hashPassword", async function (plainPassword: string) {
  const hashed = await bcrypt.hash(plainPassword, 10);
  return hashed;
});
export const User = model("user", userSchema);
