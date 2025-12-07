import express from "express";
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from "../controllers/bookingController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Combined upload for both payment and ID
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'paymentProof') {
      cb(null, path.join(__dirname, '../uploads/payments'));
    } else if (file.fieldname === 'idPhoto') {
      cb(null, path.join(__dirname, '../uploads/ids'));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadBookingDocs = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = /image\/(jpeg|jpg|png|webp)|application\/pdf/.test(file.mimetype);
    
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only image or PDF files allowed'));
    }
  }
}).fields([
  { name: 'paymentProof', maxCount: 1 },
  { name: 'idPhoto', maxCount: 1 }
]);

const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getBookingById);
router.post("/", uploadBookingDocs, createBooking);
router.put("/:id", uploadBookingDocs, updateBooking);
router.delete("/:id", deleteBooking);

export default router;