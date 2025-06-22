import express, { Application, Request, Response } from "express";
import mongoose, { model, Schema } from "mongoose";
import { Note } from "./models/notes.model";
import { notesRoute } from "./controllers/note.controller";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});
export default app;
