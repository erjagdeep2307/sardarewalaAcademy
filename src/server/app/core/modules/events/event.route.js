import { Router } from "express";
import connectionPool from '#db';
import eventRepo from '#events/event.repo';
import eventService from '#events/event.service';
import EventController from "#controllers/EventController";
import {uploader} from "./event.middleware.js";
import { createCloudinaryService } from "../../../infrastructure/cloudinary/cloudinary.js";
// Inject the dependecies

const cloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
};
const EventRepo = eventRepo(connectionPool);
const CloudinaryService = createCloudinaryService(cloudinaryConfig);
const EventService = eventService(EventRepo,CloudinaryService);
const eventController = EventController(EventService);
const eventRouter = Router();
// Get all events
eventRouter.get("/", eventController.getEvents);
// Create a new event
eventRouter.post("/",uploader.single("event_image"), eventController.createEvent);
// Get an event by Id
eventRouter.get("/:id", eventController.getEventById); 
// Delete an event by Id
eventRouter.delete("/:id", eventController.deleteEvent);
export default eventRouter;