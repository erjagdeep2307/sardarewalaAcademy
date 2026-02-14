import AuthController from '#controllers/AuthController';
import Router from 'express';
import connectionPool  from '#db';
import { authRateLimiter } from '#middleware/RateLimiterMiddleware';
import AuthRepo from "#auth/auth.repo";
import AuthService from "#auth/auth.service";

import { AuthGuard } from '#middleware/AuthMiddleware';
const authRouter = Router();


const authRepo  = AuthRepo(connectionPool);
const authService = AuthService(authRepo);
const authController = AuthController(authService);

authRouter.post('/login',authRateLimiter,authController.authenticate);
authRouter.post('/logout',AuthGuard,authController.logout);
authRouter.post('/refresh',authController.refreshToken);
export default authRouter;