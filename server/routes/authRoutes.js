import express from "express";
import { body } from "express-validator";
import { register, login, getCurrentUser, logout } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { uploadProfilePhotos } from "../middleware/upload.js";

const router = express.Router();

// Validation rules
const registerValidation = [
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
];

const loginValidation = [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required")
];

// Routes
router.post("/register", uploadProfilePhotos.single('selfiePhoto'), registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", authenticate, getCurrentUser);
router.post("/logout", authenticate, logout);

export default router;