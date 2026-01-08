import EventValidationSchema from "#events/event.schema";
import { json, success } from "zod";
// Create a new event
const EventController = (eventService) => {

    const createEvent = async (req, res, next) => {
        try {
            
            const dataToValidate = {...req.body,event_image:req.file?.path};
            const validatedData = EventValidationSchema.safeParse(dataToValidate);

            if (validatedData.success === false) {
                return res.status(400).send({
                    success: false,
                    message: 'Validation failed',
                    errors: validatedData.error.flatten().fieldErrors
                });
            }
            else{
                console.log(validatedData);
            }

            if(req.file)
            {
                const createdEvent = await eventService.create(validatedData.data,req.file);
                console.log(createEvent);
                res.status(201).send({
                    success: true,
                    message: 'Event created successfully',
                    data: createdEvent
                }); 
            }
            else{
                res.status(401).send({
                    success: false,
                    message:"Event image is required",
                    data:null
                });
            }

        } catch (error) {
            res.status(401).send({
                success: false,
                message:error.message,
                data:null
            });
            // next(error);
        }
    }
    // Get all events
    const getEvents = async (req, res) => {
        try {
            const data = await eventService.list();
            res.status(200).json({
                success:true,
                message:data.message,
                data:data.list
            });
        } catch (error) {
            res.status(501).send({
                success: false,
                message: error.message,
                data:[]
            });
        }
    }

    // Get an event by Id
    const getEventById = async (req, res, next) => {
        try {
            // res.send(`Event details for ID: ${req.params.id}`);
            const data = await eventService.listById(req.params.id);
             res.status(200).json({
                success:true,
                message:data.message,
                data:data.eventData
            });
        } catch (error) {
            res.status(501).send({
                success: false,
                message: error.message,
                data:[]
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