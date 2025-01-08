import { Request, Response } from "express";
import { CreateUser } from "../dtos/CreateUser.dto";
import { pool } from "../database";
import { User } from "../types/user.types";
import { ResultSetHeader } from "mysql2";

const user_select_statement = "id, username, email, access";

export async function get_student_users(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params;

  const query = id
    ? `SELECT ${user_select_statement} FROM users WHERE id = ${id}`
    : `SELECT ${user_select_statement} FROM users`;
  const params = id && [id];

  const [rows] = await pool.query<User[]>(query, params);

  if (rows.length === 0) {
    res.status(404).json({
      message: "User not found",
    });
  }

  res.json(id ? rows[0] : { users: rows });
}

export async function create_user(
  req: Request<{}, {}, CreateUser>,
  res: Response
) {
  const { username, password, email, access } = req.body;
  const params = [username, password, email, access];
  const query = `INSERT INTO users 
  (username, password, email, access) 
  VALUES (?, ?, ?, ?)`;

  const [result] = await pool.query<ResultSetHeader>(query, params);

  const [user] = await pool.query<User[]>(
    `SELECT ${user_select_statement} FROM users WHERE id = ?`,
    [result.insertId]
  );

  res.json(user[0]);
}
