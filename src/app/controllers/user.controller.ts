import { User } from "./../models/user.model";
import express, { Request, Response } from "express";

import { z } from "zod";
import bcrypt from "bcrypt";

export const userRoute = express.Router();
//zod validator
const createUserSchema = z.object({
  fristName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

userRoute.post("/create", async (req: Request, res: Response) => {
  try {
    const body = await createUserSchema.parseAsync(req.body);

    const exist = await User.findOne({ email: body.email });

    if (exist) {
      res.status(409).json({ status: 409, message: "User Already Registred" });
    } else {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;

      const userData = await User.create(body);
      res.status(201).json({
        success: true,
        massage: "user create successfully",
        createdUser: userData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      massage: "user create failed",
      error: error instanceof Error ? error.message : error,
    });
  }
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
