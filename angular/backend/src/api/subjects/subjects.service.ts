import { db } from "../../database";

const create = ({ name, credits, level, instructor }, cb) => {
  db.query(
    `INSERT INTO subjects (name, credits, level, instructor) VALUES (?,?,?,?)`,
    [name, credits, level, instructor],
    (err, results, fields) => {
      console.log({ err, results, fields });
      if (err) {
        return cb(err);
      }
      return cb(null, results);
    }
  );
};
const getAll = (cb) => {
  db.query(
    "SELECT id, name, credits, level, instructor from subjects",
    [],
    (err, results, fields) => {
      console.log({ err, results, fields });
      if (err) {
        return cb(err);
      }
      return cb(null, results);
    }
  );
};
const getById = (id, cb) => {
  db.query(
    "SELECT name, credits, level, instructor from subjects WHERE id = ?",
    [id],
    (err, results, fields) => {
      console.log({ err, results, fields });
      if (err) {
        return cb(err);
      }
      return cb(null, results[0]);
    }
  );
};
const update = (id, { name, credits, level, instructor }, cb) => {
  console.log({ id, name });
  db.query(
    "UPDATE subjects SET name = ?, credits = ?, level = ?, instructor = ? WHERE id = ?",
    [name, credits, level, instructor, id],
    (err, results, fields) => {
      console.log({ err, results, fields });
      if (err) {
        return cb(err);
      }
      return cb(null, results[0]);
    }
  );
};
const remove = (id, cb) => {
  db.query(
    "DELETE FROM subjects WHERE id = ?",
    [id],
    (err, results, fields) => {
      console.log({ err, results, fields });
      if (err) {
        return cb(err);
      }
      return cb(null, results[0]);
    }
  );
};
export { create, getAll, getById, update, remove };
