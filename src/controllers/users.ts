import { Request, Response } from "express";
import { CreateUser } from "../dtos/CreateUser.dto";
import { pool } from "../database";

const user_select_statement = "id, username, email, access";

export async function get_student_users(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params;
  const [rows] = await pool.query(
    id
      ? `SELECT ${user_select_statement} FROM users WHERE id = ${id}`
      : `SELECT ${user_select_statement} FROM users`
  );
  res.json({
    users: rows,
  });
}

export function createUser(req: Request<{}, {}, CreateUser>, res: Response) {
  const { username, password } = req.body;
  console.log(req.query);

  res.json({
    username,
    password,
    message: "User created",
  });
}
