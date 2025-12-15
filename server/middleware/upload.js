import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define upload directories
const dirs = ['uploads/cars', 'uploads/ids', 'uploads/payments', 'uploads/business', 'uploads/profiles'];

// Create directories if they don't exist
dirs.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    console.log(`Checking directory: ${fullPath}`);
    if (!fs.existsSync(fullPath)) {
        console.log(`Creating directory: ${fullPath}`);
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Directory created successfully: ${fullPath}`);
    } else {
        console.log(`Directory already exists: ${fullPath}`);
    }
});

// Base storage configuration
const createStorage = (uploadPath) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const destPath = path.join(__dirname, '..', uploadPath);
      
      // Double-check the directory exists before saving
      if (!fs.existsSync(destPath)) {
        console.log(`Creating missing directory on upload: ${destPath}`);
        fs.mkdirSync(destPath, { recursive: true });
      }
      
      console.log(`Saving file to: ${destPath}`);
      cb(null, destPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
      console.log(`Generated filename: ${filename}`);
      cb(null, filename);
    }
  });
};

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
  }
};

// File filter for documents (ID, licenses, etc.)
const documentFilter = (req, file, cb) => {
  console.log(`Filtering file: ${file.originalname}, mimetype: ${file.mimetype}`);
  const allowedTypes = /jpeg|jpg|png|pdf|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /image\/(jpeg|jpg|png|webp)|application\/pdf/.test(file.mimetype);

  if (mimetype && extname) {
    console.log(`File accepted: ${file.originalname}`);
    return cb(null, true);
  } else {
    console.log(`File rejected: ${file.originalname}`);
    cb(new Error('Only image or PDF files are allowed'));
  }
};

// Create upload middleware for different features
export const uploadCarImages = multer({
  storage: createStorage('uploads/cars'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFilter
});

export const uploadIdDocuments = multer({
  storage: createStorage('uploads/ids'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: documentFilter
});

export const uploadPaymentProofs = multer({
  storage: createStorage('uploads/payments'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: documentFilter
});

export const uploadBusinessDocuments = multer({
  storage: createStorage('uploads/business'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: documentFilter
});

export const uploadProfilePhotos = multer({
  storage: createStorage('uploads/profiles'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFilter
});