import { Router } from "express";
import connectionPool from '#db';
import eventRepo from '#events/event.repo';
import eventService from '#events/event.service';
import EventController from "#controllers/EventController";
const EventRepo = eventRepo(connectionPool);
const EventService = eventService(EventRepo);
const eventController = EventController(EventService);
const eventRouter = Router();

// Get all events
eventRouter.get("/", eventController.getEvents);
// Create a new event
eventRouter.post("/", eventController.createEvent);

// // Get an event by Id
// eventRouter.get("/:id", (req, res) => {
//   res.send(`Get Event with ID: ${req.params.id}`);
// }); 

// // Update an event by Id
// eventRouter.put("/:id", (req, res) => {
//   res.send(`Update Event with ID: ${req.params.id}`);
// });

// // Delete an event by Id
// eventRouter.delete("/:id", deleteEvent);

export default eventRouter;