import express from 'express';
import DashboardController from '#controllers/DashboardController';
import AnalyticsService from '#dashboard/analytics.service';
import AnalyticsRepo from '#dashboard/analytics.repo';
import connectionPool  from '#db';
import { authRateLimiter } from '#middleware/RateLimiterMiddleware';
import { AuthGuard } from '#middleware/VerifyAccessToken';

const analyticsRouter = express.Router();

const analyticsRepo = AnalyticsRepo(connectionPool);
const analyticsService = AnalyticsService(analyticsRepo);
const analyticsController = DashboardController(analyticsService);

analyticsRouter.get('/',authRateLimiter,AuthGuard,analyticsController.getDashboardData);

export default analyticsRouter;