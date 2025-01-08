export type CreateUser = {
  username: string;
  password: string;
  email: string;
  access?: "student" | "teacher" | "admin" | null;
}

export type CreateNote = {
  title: string;
  body: string;
}