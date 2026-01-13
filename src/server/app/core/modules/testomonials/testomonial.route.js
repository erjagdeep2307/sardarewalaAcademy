import { Router } from "express";
import TestomonialController from "#controllers/TestomonialController";
import TestomonialRepo from "#testomonial/testomonial.repo";
import TestomonialService from "#testomonial/testomonial.service";
import { createCloudinaryService } from "../../../infrastructure/cloudinary/cloudinary.js";
import { uploader } from "#events/event.middleware";
import connectionPool from "#db";
const testomonialRouter = Router();
// 
const cloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
};
const testimonialRepo = TestomonialRepo(connectionPool);
const cloudService = createCloudinaryService(cloudinaryConfig);
const testimonialService = TestomonialService(testimonialRepo, cloudService);
const testomonialCtrl = TestomonialController(testimonialService);

testomonialRouter.get("/", testomonialCtrl.listTestomonial);
testomonialRouter.post("/", uploader.single("image_file"), testomonialCtrl.createTestomonial);
testomonialRouter.delete("/:id", testomonialCtrl.removeTestomonial);
// testomonialRouter.delete("/:id",async (req,res)=>{
//     const rsp = await cloudService.removeImage("Testomonials/ap4vvueijcvouhnfsbqt");
//     res.send(rsp);
// });
testomonialRouter.put("/:id", (req, res) => {
    res.send(`Update Testomonial with ID}`);
});

export default testomonialRouter;