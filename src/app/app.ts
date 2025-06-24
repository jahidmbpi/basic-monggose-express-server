import express, { Application, Request, Response } from "express";
import { notesRoute } from "./controllers/note.controller";
import { userRoute } from "./controllers/user.controller";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoute);
app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});
export default app;
