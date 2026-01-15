import { Router } from "express";
import connectionPool from "#db";
import TestomonialRepo from "#testomonial/testomonial.repo";
import TestomonialService from "#testomonial/testomonial.service";
import TestomonialController from "#controllers/TestomonialController";

import { createCloudinaryService } from "#cloudinary";
import { uploader } from "#events/event.middleware";
// 
const cloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
};
const cloudService = createCloudinaryService(cloudinaryConfig);
const testimonialRepo = TestomonialRepo(connectionPool);
const testimonialService = TestomonialService(testimonialRepo, cloudService);
const testomonialCtrl = TestomonialController(testimonialService);
const testomonialRouter = Router();
// Get all Testomonials
testomonialRouter.get("/", testomonialCtrl.listTestomonial);
// Create a new Testomonial
testomonialRouter.post("/", uploader.single("image_file"), testomonialCtrl.createTestomonial);
// Delete a Testomonial by Id
testomonialRouter.delete("/:id", testomonialCtrl.removeTestomonial);
// Update a Testomonial by Id Route is defined but controller method is not implemented yet
testomonialRouter.put("/:id", (req, res) => {
    res.send(`Update Testomonial with ID}`);
});
export default testomonialRouter;