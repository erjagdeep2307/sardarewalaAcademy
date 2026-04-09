import { Router } from "express";
import { uploader } from "#events/event.middleware";
import { AuthGuard } from "#middleware/VerifyAccessToken";
import { authRateLimiter } from "#middleware/RateLimiterMiddleware";
import { createCloudinaryService } from "#cloudinary";
import ProgramController from "#controllers/ProgramController";
import ProgramService from "#program/program.service";
import ProgramRepo from "#program/program.repo";
import connectionPool from "#db";

const cloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
};

const programRouter = Router();
const cloudinaryService = createCloudinaryService(cloudinaryConfig);
const programRepo = ProgramRepo(connectionPool);
const programService = ProgramService(programRepo,cloudinaryService);
const programController = ProgramController(programService);

// programRouter.post('/',authRateLimiter,AuthGuard,uploader.single("program_thumb"),programController.createProgram);
programRouter.post('/',uploader.single("program_thumb"),programController.createProgram);

export default programRouter;