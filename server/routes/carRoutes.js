import express from "express";
import { getCars, createCar, updateCar, deleteCar, getCarById } from "../controllers/carController.js";

const router = express.Router();

router.get("/", getCars);
router.post("/", createCar);
router.get("/:id", getCarById)
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;