import Router from 'express';
import connectionPool  from '#db';
import AuthRepo from "#auth/auth.repo";
import AuthService from "#auth/auth.service";
import AuthController from '#controllers/AuthController';

import { AuthGuard } from '#middleware/VerifyAccessToken';
import { authRateLimiter } from '#middleware/RateLimiterMiddleware';
import { HaveRefreshToken } from '#middleware/VerifyRefreshToken';
const authRouter = Router();


const authRepo  = AuthRepo(connectionPool);
const authService = AuthService(authRepo);
const authController = AuthController(authService);

authRouter.post('/login',authRateLimiter,authController.authenticate);
authRouter.post('/logout',AuthGuard,HaveRefreshToken,authController.logout);
authRouter.post('/refresh',HaveRefreshToken,authController.refreshToken);
export default authRouter;