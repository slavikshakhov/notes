import express from 'express'
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "./notes.controller";
const notesRouter = express.Router()


notesRouter.get("/", getNotes);
notesRouter.post("/", createNote);
notesRouter.get("/:id", getNoteById);

notesRouter.patch("/", updateNote);
notesRouter.delete("/", deleteNote);

export default notesRouter