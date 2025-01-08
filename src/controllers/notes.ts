import { Request, Response } from "express";
import { CreateNote } from "../dtos/CreateUser.dto";
import { pool } from "../database";
import { ResultSetHeader } from "mysql2";
import { Note } from "../types/note.types";

export async function getNotes(req: Request, res: Response) {
  const [result] = await pool.query<Note[]>("SELECT * FROM notes");

  res.json(result);
}

export async function getNote(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const [result] = await pool.query<Note[]>(
    "SELECT * FROM notes WHERE id = ?",
    [id]
  );

  if (result.length === 0) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  res.json(result[0]);
}

export async function createNotes(
  req: Request<{}, {}, CreateNote>,
  res: Response
) {
  const { title, body } = req.body;

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO notes (title, body) VALUES (?, ?)`,
    [title, body]
  );

  const [notes] = await pool.query<Note[]>(`SELECT * FROM notes WHERE id = ?`, [
    result.insertId,
  ]);

  res.json(notes[0]);
}

export async function deleteNote(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM notes WHERE id = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  res.status(204).send(); // sends nothing
}

export async function updateNote(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const { title, body } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE notes SET title = ?, body = ? WHERE id = ?`,
    [title, body, id]
  );

  if (result.affectedRows === 0) {
    res.json({ message: "Note not found." });
    return;
  }

  res.json({message: "Update successfully!"});
}
