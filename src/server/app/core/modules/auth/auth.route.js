import AuthController from '#controllers/AuthController';
import Router from 'express';
const authRouter = Router();
const authController = AuthController();
authRouter.post('/login',authController.authenticate);
export default authRouter;