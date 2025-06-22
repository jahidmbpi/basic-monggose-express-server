import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const notesRoute = express.Router();

notesRoute.post("/cretae", async (req: Request, res: Response) => {
  const body = req.body;

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    massage: "note created successfully",
    note,
  });
});
notesRoute.get("/get", async (req: Request, res: Response) => {
  const body = req.body;

  const notes = await Note.find();

  res.status(201).json({
    success: true,
    massage: "note get successfully",
    notes,
  });
});
notesRoute.get("/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;

  // console.log(id);

  const notes = await Note.findById(id);

  res.status(201).json({
    success: true,
    massage: "note get successfully",
    notes,
  });
});

notesRoute.patch("/update/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const updateBody = req.body;
  try {
    console.log(updateBody, id);

    // const notes = await Note.findByIdAndUpdate(id, updateBody, { new: true });
    // const update = await Note.updateOne({ _id: id }, updateBody, { new: true });
    const notes = await Note.findOneAndUpdate({ _id: id }, updateBody, {
      new: true,
    });

    res.status(200).json({
      success: true,
      massage: "note update successfully",
      notes,
    });
  } catch (error) {
    console.log(error);
  }
});
notesRoute.delete("/delete/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const updateBody = req.body;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      massage: "note update successfully",
      deletedNote,
    });
  } catch (error) {
    console.log(error);
  }
});
