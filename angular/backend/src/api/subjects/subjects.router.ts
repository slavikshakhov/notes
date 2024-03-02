import express from "express";
import {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "./subjects.controller";
const subjectsRouter = express.Router();

subjectsRouter.get("/", getSubjects);
subjectsRouter.post("/", createSubject);
subjectsRouter.get("/:id", getSubjectById);

subjectsRouter.put("/:id", updateSubject);
subjectsRouter.delete("/:id", deleteSubject);

export default subjectsRouter;
