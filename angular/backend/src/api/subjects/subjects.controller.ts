import { Request, Response } from "express";
import { create, getAll, getById, update, remove } from "./subjects.service";

const createSubject = (req: Request, res: Response) => {
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

const getSubjectById = (req, res) => {
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
const getSubjects = (req, res) => {
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

const updateSubject = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log({ body, id });

  update(id, body, (err, results) => {
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
const deleteSubject = (req, res) => {
  const id = req.params.id;
  remove(id, (err, results) => {
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

export {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
