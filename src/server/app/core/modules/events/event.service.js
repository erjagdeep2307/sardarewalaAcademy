// Event Service
const eventService = (eventRepo, cloudService) => {
    // Logic to create an event in the database
    const create = async (eventData, image, log) => {
        //  [imageData.event_id, imageData.image_url, imageData.cloudinary_public_id];
        const uploadResult = await cloudService.uploadImage(image.buffer, log);
        if (!uploadResult || !uploadResult.secure_url) {
            throw new Error('Image upload failed');
        }
        const result = await eventRepo.createEvent(eventData);
        if (!result) {
            throw new Error('Event creation failed');
        }
        const imageData = {
            event_id: result.id,
            image_url: uploadResult.secure_url,
            cloudinary_public_id: uploadResult.public_id
        };
        return await eventRepo.createImageData(imageData);
    };


    const list = async (log) => {
            const eventList = await eventRepo.listEvents();
            if (eventList.length===0) {
                const err = new Error(`No Event found`);
                err.code = "NO_EVENT_NOT_FOUND";
                throw err;
            }
            return eventList;
    };

    const listById = async (id) => {
        try {
            if (!id) {
                return {
                    message: "Event Id is required",
                    eventData: {}
                }
            }
            const eventdata = await eventRepo.listEventById(id);
            if (eventdata) {
                return {
                    message: "Event List",
                    eventData: eventdata
                }
            }
            else {
                throw new Error("No Event Data Found");
            }

        } catch (error) {
            console.log(`Failed to Fetch Events :${error.message}`);
            throw new Error("Failed to Fetch Event");
        }
    }

    const removeEventById = async (id) => {
        if (!id) {
            throw new Error("Event id is required");
        }
        const rowsDeleted= await eventRepo.removeEventById(id);
        if (rowsDeleted === 0) {
            const err = new Error(`Event not found for id: ${id}`);
            err.code = "EVENT_NOT_FOUND";
            throw err;
        }
        return rowsDeleted;
    };
    return { create, list, listById, removeEventById, };
};
export default eventService;