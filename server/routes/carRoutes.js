import express from "express";
import { getCars, getCarById, createCar, updateCar, deleteCar } from "../controllers/carController.js";
import { uploadCarImages } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getCars);
router.get("/owner/:ownerId", getCarsByOwnerId);
router.get("/:id", getCarById);
router.post("/", uploadCarImages.array('images', 10), createCar); // Upload up to 10 images
router.put("/:id", uploadCarImages.array('images', 10), updateCar);
router.delete("/:id", deleteCar);

export default router;