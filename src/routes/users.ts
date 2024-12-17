import { Router } from "express";
import { createUser, get_student_users } from "../controllers/users";

const router = Router();

router.get("/", get_student_users);
router.get ("/:id", get_student_users);
router.post ("/", createUser);

export default router;
