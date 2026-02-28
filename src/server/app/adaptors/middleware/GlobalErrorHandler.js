import AppError from "#utilities/AppError";
import multer from "multer";

const globalErrorHandler = (err, req, res, next) => {
    // Multer Error Handler
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    if(err instanceof AppError)
    {
        return res.status(err.statusCode).json({
            success: "failed",
            message: err.message,
        });
    }
    
    // Default Handler
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: "error",
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV) === "Development" && { stack: err.stack }
    });
}
export { globalErrorHandler }