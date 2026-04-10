
import multer from "multer";
import path from "path";
import AppError from "#utilities/AppError";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log('INside multer');
  if (!file) {
    return cb(new AppError("File not provided", 400), false);
  }

  const allowedTypes = [".jpg", ".jpeg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    return cb(new AppError("Only images are allowed", 400), false);
  }

  cb(null, true);
};

export const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

