import express from "express";
import usersRouter from "./routes/users";
import notesRouter from "./routes/notes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);