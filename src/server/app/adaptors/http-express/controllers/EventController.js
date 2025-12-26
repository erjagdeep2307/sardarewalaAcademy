import EventValidationSchema from "#events/event.schema";
// Create a new event
const EventController = (eventService) => {

    const createEvent = async (req, res, next) => {
        try {
            const validatedData = EventValidationSchema.safeParse(req.body);
            if (validatedData.success === false) {
                return res.status(400).send({
                    success: false,
                    message: 'Validation failed',
                    errors: validatedData.error.flatten().fieldErrors
                });
            }
            const createdEvent = await eventService.create(validatedData.data);
            res.status(201).send({
                success: true,
                message: 'Event created successfully',
                data: createdEvent
            }); 
        } catch (error) {
            next(error);
        }
    }
    // Get all events
    const getEvents = async (req, res, next) => {
        try {
            res.send('List of events');
        } catch (error) {
            next(error);
        }
    }
    // Get an event by Id
    const getEventById = async (req, res, next) => {
        try {
            res.send(`Event details for ID: ${req.params.id}`);
        } catch (error) {
            next(error);
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
    const deleteEvent = async (req, res, next) => {
        try {
            res.send(`Event with ID: ${req.params.id} deleted`);
        } catch (error) {
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