// Custom Error class , to be used to throw app errors only.
class AppError extends Error
{
    constructor(message,statusCode){
        super(message),
        this.statusCode = statusCode,
        this.isOperational = true,
        Error.captureStackTrace(this,this.constructor);
    }
}
export default AppError;