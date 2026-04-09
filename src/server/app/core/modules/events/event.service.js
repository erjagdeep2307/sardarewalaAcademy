// Event Service
import AppError from "#utilities/AppError";
import logger from "#logger";
const eventService = (eventRepo, cloudService) => {
    // Logic to create an event in the database
    const create = async (eventData, image) => {
        //  [imageData.event_id, imageData.image_url, imageData.cloudinary_public_id];
        const uploadResult = await cloudService.uploadImage(image.buffer);
        if (!uploadResult || !uploadResult.secure_url) {
            logger.error(`Event Image Upload Failed for Event:${eventData.title}`);
            throw new Error('Event Image upload failed');
        }
        const result = await eventRepo.createEvent(eventData);
        if (!result) {
            logger.error(`Event Creation Failed for Event:${eventData.title}`);
            throw new AppError('Event creation failed',400);
        }
        const imageData = {
            event_id: result.id,
            image_url: uploadResult.optimizedUrl,
            cloudinary_public_id: uploadResult.public_id
        };
        return await eventRepo.createImageData(imageData);
    };


    const list = async () => {
            const eventList = await eventRepo.listEvents();
            return eventList;
    };

    const listById = async (id) => {
            if (!id) {
                logger.warn(`Event Id is required to fetch event details`);
                throw new AppError('Event Id is required',400);
            }
            const eventdata = await eventRepo.listEventById(id);
            if (!eventdata) {
                logger.warn(`Event not found for id:${id}`);
                throw new AppError('Event not found',404);
            }
            return eventdata;
    }

    const removeEventById = async (id) => {
            if (!id) {
                logger.warn(`Event Id is required for deletion`);
                throw new AppError("Event id is required for removal", 400);
            }
            const rowsDeleted = await eventRepo.removeEventById(id);
            if(!rowsDeleted){
                logger.warn(`Event not found for id:${id} during deletion`);
                throw new AppError(`Event not found for id: ${id}`, 404);
            }
            if (rowsDeleted && rowsDeleted.cloudinary_public_id) {
                const result = await cloudService.removeImage(rowsDeleted.cloudinary_public_id);
                logger.info(`Result from Cloudinary image with public id:${rowsDeleted.cloudinary_public_id} Deletion: ${result.result}`);   
                if(result.result !== "ok"){
                    logger.warn(`Failed to delete image from cloud storage for event id:${id}`);
                }
                logger.info(`Event with id:${id} removed successfully along with its image from cloud storage`);
            }
            return rowsDeleted;
    };
    
    return { create, list, listById, removeEventById, };
};
export default eventService;