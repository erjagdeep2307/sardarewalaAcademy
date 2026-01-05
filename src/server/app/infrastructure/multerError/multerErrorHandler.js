import multer from "multer";
export const multerErrorHandler = (err, req, res, next) => {
    console.log(`Inside multer error handler`);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  next();
};
