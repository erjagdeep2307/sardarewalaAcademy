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
                secure: true,        // must be false on HTTP
                sameSite: 'none',      // use 'lax' for local testing
                partitioned: true,
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
            const refToken = req.cookies.refreshToken;
            const result = await authService.revokeToken(refToken);
            console.log(`Revoke token returned :${result}`);
            res.cookie('refreshToken', "", {
                httpOnly: true,
                sameSite: "none",
                secure: true,        // must be false on HTTP
                expires: new Date(0)    // use 'lax' for local testing
            })
            res.status(200).json({
                status: "success",
                message: "User Logged Out Successfully",
            })
        } catch (error) {
            console.log(error);
            console.log(`Failed to logout,Error:${error.message}`);
            next(error);
        }
    }

    const refreshToken = async (req, res, next) => {
        try {
            const currRefreshToken = req.cookies.refreshToken;
            if (!currRefreshToken) {
                return res.status(401).json({
                    status: "failed",
                    message: "Missing refresh Token"
                })
            }
            const result = await authService.refreshAccessToken(currRefreshToken);
            res.cookie('refreshToken', currRefreshToken, {
                path: '/',
                httpOnly: true,
                secure: true,        // must be false on HTTP
                sameSite: 'none',      // use 'lax' for local testing
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                status: "success",
                message: "Token refreshed Successfully",
                data: result
            })

        } catch (error) {
            console.error(error.message);
            next(error);
        }

    }
    return { authenticate, logout, refreshToken };
}
export default AuthController;