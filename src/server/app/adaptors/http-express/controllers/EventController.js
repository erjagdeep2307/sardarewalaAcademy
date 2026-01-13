import EventValidationSchema from "#events/event.schema";
import { json, success } from "zod";
import logger from "#logger";
// Create a new event
const EventController = (eventService) => {
    const createEvent = async (req, res) => {
        try {
            logger.info(`Event Create Request Recieved`);
            const dataToValidate = { ...req.body, event_image: req.file?.path };
            const validatedData = EventValidationSchema.safeParse(dataToValidate);

            if (validatedData.success === false) {
                logger.warn(`Event Create Payload validation failed`);
                return res.status(400).send({
                    success: false,
                    message: 'Validation failed',
                    errors: validatedData.error.flatten().fieldErrors
                });
            }
            else {
                req.log.info({validatedData},`Event Create Request payload:`);
            }

            if (req.file) {
                const createdEvent = await eventService.create(validatedData.data, req.file,req.log);
                req.log.info(`Event Create Succesfull with Id:${createdEvent.id}`);
                console.log(createEvent);
                res.status(201).send({
                    success: true,
                    message: 'Event created successfully',
                    data: createdEvent
                });
            }
            else {
                req.log.warn(`Event Create Request Missing Event Image`);
                res.status(401).send({
                    success: false,
                    message: "Event image is required",
                    data: null
                });
            }

        } catch (error) {
            console.log(error);
            req.log.error(`Event Create Request Error:${error.message}`);
            res.status(501).send({
                success: false,
                message: "Generic Error",
                data: null
            });
        }
    }

    // Get all events
    const getEvents = async (req, res) => {
        try {
            const data = await eventService.list(req.log);
            res.status(200).json({
                success: true,
                message: "Event List",
                data: data
            });
        } catch (error) {
            res.status(501).send({
                success: false,
                message: error.message,
                data: []
            });
        }
    }

    
    // Get an event by Id
    const getEventById = async (req, res) => {
        try {
            // res.send(`Event details for ID: ${req.params.id}`);
            const data = await eventService.listById(req.params.id,req.log);
            res.status(200).json({
                success: true,
                message: data.message,
                data: data.eventData
            });
        } catch (error) {
            res.status(501).send({
                success: false,
                message: error.message,
                data: []
            });
        }
    }

    // Update an event by Id
    const updateEvent = async (req, res, next) => {
        try {
            res.send(`Event with ID: ${req.params.id} updated`);
        } catch (error) {
            next(error);
        }
    }
    // Delete an event by Id    
    const deleteEvent = async (req, res) => {
        try {
            const eventId = req.params.id;
            const data = await eventService.removeEventById(eventId,req.log);
            logger.info(`Event Delete Successfully with Id: ${eventId}`);
            res.status(200).json({
                success: true,
                message: "Event Delete Succesfully",
                data: data
            })
        } catch (error) {
            logger.error({error},`Event Delete Error for ${req.params.id}`);
            res.status(501).send({
                success: false,
                message: error.message,
                data: []
            });
        }
    }
    return {
        createEvent,
        getEvents,
        getEventById,
        updateEvent,
        deleteEvent
    }
}
export default EventController;