import { RowDataPacket } from "mysql2";

export type Note = RowDataPacket & {
  id: number;
  title: string;
  body: string;
  createdAt: Date
};