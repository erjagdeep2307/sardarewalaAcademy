import AuthController from '#controllers/AuthController';
import Router from 'express';
import connectionPool  from '#db';
import { authRateLimiter } from '#middleware/RateLimiterMiddleware';
import AuthRepo from "#auth/auth.repo";
import AuthService from "#auth/auth.service";

const authRouter = Router();


const authRepo  = AuthRepo(connectionPool);
const authService = AuthService(authRepo);
const authController = AuthController(authService);

authRouter.post('/login',authRateLimiter,authController.authenticate);
authRouter.post('/logout',authController.logout);

export default authRouter;