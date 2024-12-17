import { Request, Response } from "express";
import { CreateUser } from "../dtos/CreateUser.dto";
import { pool } from "../database";

export async function get_student_users(req: Request, res: Response) {
  const [rows] = await pool.query(
    "SELECT id, username, email, access FROM student_users"
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
