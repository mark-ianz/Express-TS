import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "student_system",
});

export const get_student_users = async () => {
  const result = await pool.query("SELECT id, username, email, access FROM student_users");
  return result [0];
};