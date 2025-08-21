import express from "express";
import { getCars, createCar, updateCar, deleteCar } from "../controllers/carController";

const router = express.Router();

router.get("/", getCars);
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;