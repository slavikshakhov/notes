import { db } from "../../utils/database";

const create = (data, cb) => {
  console.log({ data });
  db.query(
    `INSERT INTO notestable (description) VALUES (?)`,
    [data.description],
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
  db.query("SELECT description from notestable", [], (err, results, fields) => {
    console.log({ err, results, fields });
    if (err) {
      return cb(err);
    }
    return cb(null, results);
  });
};
const getById = (id, cb) => {
  db.query(
    "SELECT description from notestable WHERE id = ?",
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
const update = (data, cb) => {
  db.query(
    "UPDATE notestable SET description = ? WHERE id = ?",
    [data.description, data.id],
    (err, results, fields) => {
      console.log({ err, results, fields });
      if (err) {
        return cb(err);
      }
      return cb(null, results[0]);
    }
  );
};
const remove = (data, cb) => {
    db.query(
      "DELETE FROM notestable WHERE id = ?",
      [data.id],
      (err, results, fields) => {
        console.log({ err, results, fields });
        if (err) {
          return cb(err);
        }
        return cb(null, results[0]);
      }
    );
}
export { create, getAll, getById, update, remove };
