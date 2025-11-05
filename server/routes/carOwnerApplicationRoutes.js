import express from "express";
import {
    getAllApplications,
    getApplicationById,
    getApplicationsByUser,
    submitApplication,
    reviewApplication,
    updateApplication,
    deleteApplication
} from "../controllers/carOwnerApplicationController.js";

const router = express.Router();

// Get all applications (admin)
router.get("/", getAllApplications);

// Get application by ID
router.get("/:id", getApplicationById);

// Get applications by user ID
router.get("/user/:userId", getApplicationsByUser);

// Submit new application
router.post("/", submitApplication);

// Review application (approve/reject)
router.patch("/:id/review", reviewApplication);

// Update application
router.put("/:id", updateApplication);

// Delete application
router.delete("/:id", deleteApplication);

export default router;