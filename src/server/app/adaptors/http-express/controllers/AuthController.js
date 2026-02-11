import logger from "#logger";
import { LoginSchema } from "#auth/auth.validation";
const AuthController = (authService) => {
    const authenticate = async (req, res, next) => {
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
            const { refreshToken, ...userData } = response;
            res.cookie('refreshToken', refreshToken, {
                path: '/',
                httpOnly: true,
                secure: false,        // must be false on HTTP
                sameSite: 'lax',      // use 'lax' for local testing
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                status: "success",
                message: "Logged in Successfully",
                data: userData
            })
        } catch (error) {
            console.error("Error:", error.message);
            next(error);
        }
    };

    const logout = async (req, res, next) => {
        try {
            logger.info(`Logout Request Recieved`);
            res.clearCookie(refreshToken, {
                httpOnly: true,
                sameSite: "Strict",
                secure: process.env.NODE_ENV === "production"
            })
            res.status(200).json({
                status: "success",
                message: "User Logged Out Successfully",
            })
        } catch (error) {
            console.log(`Failed to logout,Error:${error.message}`);
            next(error);
        }
    }
    return { authenticate, logout };
}
export default AuthController;