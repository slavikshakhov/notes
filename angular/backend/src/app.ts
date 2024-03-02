import express from "express";
import subjectsRouter from "./api/subjects/subjects.router";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 3000;
app.use(cors());

app.use(express.json());

app.use("/api/subjects", subjectsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
