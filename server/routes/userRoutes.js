import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { uploadProfilePhotos } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", uploadProfilePhotos.single('selfiePhoto'), createUser);
router.put("/:id", uploadProfilePhotos.single('selfiePhoto'), updateUser);
router.delete("/:id", deleteUser);

export default router;