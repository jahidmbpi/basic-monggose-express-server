import express, { Request, Response } from "express";
import { User } from "../models/user.model";
export const userRoute = express.Router();

userRoute.post("/create", async (req: Request, res: Response) => {
  const body = req.body;
  const userData = await User.create(body);
  res.status(201).json({
    success: true,
    massage: "user  create succesfully",
    createdUser: userData,
  });
});

userRoute.get("/", async (req: Request, res: Response) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    massage: "user get succesfully",
    user,
  });
});

userRoute.patch("/update/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const updateUser = await User.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );
  res.status(200).json({
    success: true,
    massage: "user updated success",
    updatedUser: updateUser,
  });
});

userRoute.delete("/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await User.findByIdAndDelete({ _id: id });
  res.status(200).json({
    success: true,
    massage: "user delated success",
    deletedUser: deletedUser,
  });
});
