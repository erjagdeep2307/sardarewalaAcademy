import logger from "#logger";
import { LoginSchema } from "#auth/auth.validation";
const AuthController = (authService) => {
    const authenticate = async (req, res, next) => {
        try {
            const validateData = LoginSchema.safeParse(req.body);
            if (!validateData.success) {
                return res.status(400).json({
                    status: "fail",
                    message: "Login Failed",
                    errors: validateData.error.flatten().fieldErrors
                })
            }

            logger.info(`Login Request Recieved for ${validateData.data.email}`);
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
            logger.info(`User logged in with id:${validateData.data.email} sucessfully`);
            res.status(200).json({
                status: "success",
                message: "Logged in Successfully",
                data: userData
            })
        } catch (error) {
            logger.error(error,`Error on Authentication Controller`);
            next(error);
        }
    };

    const logout = async (req, res, next) => {
        try {
            const refToken = req.cookies.refreshToken;
            const result = await authService.revokeToken(req.user.jti,refToken);
            logger.info(result,`logged out successfully`);
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
            logger.error(error,`Error on Logout`);
            next(error);
        }
    }

    const refreshToken = async (req, res, next) => {
        try {
            const currRefreshToken = req.cookies.refreshToken;
            const userEmail = req.user.sub;
            logger.info(`Refresh Token Request Recieved from User:${userEmail}`);
            const result = await authService.refreshAccessToken(userEmail);
            logger.info(`Token Refreshed for user:${result.userData.email}`);
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
            logger.error(error,"Error on Refresh Token");
            next(error);
        }

    }
    return { authenticate, logout, refreshToken };
}
export default AuthController;