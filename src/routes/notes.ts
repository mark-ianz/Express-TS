import { Router } from "express";
import { createNotes, deleteNote, getNote, getNotes, updateNote } from "../controllers/notes";

const router = Router();

router.get ("/", getNotes);
router.get ("/:id", getNote);
router.post ("/", createNotes);
router.delete ("/:id", deleteNote);
router.put ("/:id", updateNote);

export default router;