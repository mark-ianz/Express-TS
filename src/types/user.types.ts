import { RowDataPacket } from "mysql2";

export type User = RowDataPacket & {
  id: number;
  username: string;
  email: string;
  access: string;
}