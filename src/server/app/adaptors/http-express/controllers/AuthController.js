import logger from "#logger";
import { LoginSchema } from "#auth/auth.validation";
const AuthController = (authService) => {
    const authenticate = async (req,res,next) => {
        try {
            console.log(req.body);
            const validateData = LoginSchema.safeParse(req.body);
            if (!validateData.success) {
                return res.status(400).json({
                    status: "fail",
                    message: "Login Failed",
                    errors: validateData.error.flatten().fieldErrors
                })
            }
            logger.info(`Login Request Recieved for ${validateData.email}`);
            const response = await authService.authenticate(validateData.data);
            res.status(200).json({
                status: "success",
                message: "Logged in Successfully",
                data:response
            })
        } catch (error) {
            console.error("Error:", error.message);
            next(error); 
        }
    };
    return { authenticate };
}
export default AuthController;