export type CreateUser = {
  username: string;
  password: string;
  email: string;
  access?: "student" | "teacher" | "admin" | null;
}