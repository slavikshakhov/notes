import express, { Request, Response } from "express";

import bodyParser from "body-parser";
import notesRouter from "./api/notes/notes.router";

const app = express();
const port = process.env.PORT ?? 3000;


app.use(express.json());

app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
