import { Request, Response } from "express";
import { CreateUser } from "../dtos/CreateUser.dto";
import { get_student_users } from "../database";

export async function getUsers(req: Request, res: Response) {
  const student_users = await get_student_users();

  res.json({
    users: student_users
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
