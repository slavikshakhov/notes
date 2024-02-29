import { Request, Response } from "express";
import { create, getAll, getById, update, remove } from "./notes.service";

const createNote = (req: Request, res: Response) => {
  console.log({ req, body: req.body });
  const body = req.body;
  create(body, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const getNoteById = (req, res) => {
  const id = req.params.id;
  getById(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found",
      });
    }
    results.password = undefined;
    return res.json({
      success: 1,
      data: results,
    });
  });
};
const getNotes = (req, res) => {
  getAll((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      data: results,
    });
  });
};

const updateNote = (req, res) => {
  const body = req.body;

  update(body, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      message: "updated successfully",
    });
  });
};
const deleteNote = (req, res) => {
  const data = req.body;
  remove(data, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    return res.json({
      success: 1,
      message: "note deleted successfully",
    });
  });
};

export { createNote, getNotes, getNoteById, updateNote, deleteNote };
