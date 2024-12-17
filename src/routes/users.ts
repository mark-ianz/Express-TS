import { Router } from "express";
import { create_user, get_student_users } from "../controllers/users";

const router = Router();

router.get("/", get_student_users);
router.get ("/:id", get_student_users);
router.post ("/", create_user);

export default router;
