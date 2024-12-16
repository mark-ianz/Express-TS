import { Request, Response } from "express";
import { CreateUser } from "../dtos/CreateUser.dto";

export function getUsers(req: Request, res: Response) {
  res.json({
    users: [
      {
        id: 1,
        name: "John Doe",
      },
      {
        id: 2,
        name: "Jane Doe",
      },
    ],
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
