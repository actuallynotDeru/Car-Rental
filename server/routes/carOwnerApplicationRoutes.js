import express from "express";
import {
    getAllApplications,
    getApplicationById,
    getApplicationsByUser,
    createApplication,
    reviewApplication,
    updateApplication,
    deleteApplication,
} from "../controllers/carOwnerApplicationController.js";
import { uploadBusinessDocuments } from "../middleware/upload.js";

const router = express.Router();

// Use .fields() to handle both drivingLicense and businessLicense
const uploadAppDocs = uploadBusinessDocuments.fields([
  { name: 'drivingLicense', maxCount: 1 },
  { name: 'businessLicense', maxCount: 1 }
]);

router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.get("/user/:userId", getApplicationsByUser);
router.post("/", uploadAppDocs, createApplication);
router.patch("/:id/review", reviewApplication);
router.put("/:id", uploadAppDocs, updateApplication);
router.delete("/:id", deleteApplication);

export default router;