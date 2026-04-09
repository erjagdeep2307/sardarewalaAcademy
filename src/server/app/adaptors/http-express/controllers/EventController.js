import EventValidationSchema from "#events/event.validation";
import logger from "#logger";
// Create a new event
const EventController = (eventService) => {
    const createEvent = async (req, res) => {
        try {
            logger.info(`Event Create Request Recieved`);
            const validatedData = EventValidationSchema.safeParse(req.body);
            if (validatedData.success === false) {
                logger.warn(`Event Create Payload validation failed`);
                return res.status(400).send({
                    success: false,
                    message: 'Validation failed',
                    errors: validatedData.error.flatten().fieldErrors
                });
            }
            logger.info({ validatedData }, `Event Create Request payload`);
            if (!req.file) {
                logger.warn(`Event Create Request Missing Event Image`);
                res.status(401).send({
                    success: false,
                    message: "Event image is required",
                    data: null
                });
            }
            const createdEvent = await eventService.create(validatedData.data, req.file);
            logger.info(`Event Create Succesfull with Id:${createdEvent.id}`);
            res.status(201).send({
                success: true,
                message: 'Event created successfully',
                data: createdEvent
            });
        } catch (error) {
            logger.error(`Event Create Request Error:${error.message}`);
            next(error);
        }
    }

    // Get all events
    const getEvents = async (req, res) => {
        try {
            const data = await eventService.list(req.log);
            res.status(200).json({
                success: true,
                message: `${data.length ? "Event List" : "No Event Found"}`,
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
            const data = await eventService.listById(req.params.id, req.log);
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
            const data = await eventService.removeEventById(eventId, req.log);
            if (!data.id) {
                return res.status(404).json({
                    success: false,
                    message: `Event not found with id:${eventId}`,
                    data: data
                });
            }
            logger.info(`Event Delete Successfully with Id: ${data.id}`);
            res.status(200).json({
                success: true,
                message: `Event Delete Succesfully with id:${data.id}`,
                data: data
            })
        } catch (error) {
            logger.error({ error: error.message }, `Event Delete Error for ${req.params.id}`);
            next(error);
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