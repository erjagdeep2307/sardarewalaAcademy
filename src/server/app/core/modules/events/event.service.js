// Event Service
const eventService = (eventRepo,cloudService) => {
    // Logic to create an event in the database
    const create = async (eventData,image) => {
        //  [imageData.event_id, imageData.image_url, imageData.cloudinary_public_id];
        const uploadResult = await cloudService.uploadImage(image.buffer);
        if(!uploadResult || !uploadResult.secure_url){
            throw new Error('Image upload failed');
        }
        const result = await eventRepo.createEvent(eventData);
        if(!result){
            throw new Error('Event creation failed');
        }
        const imageData = {
            event_id: result.id,
            image_url: uploadResult.secure_url,
            cloudinary_public_id: uploadResult.public_id
        };
        return await eventRepo.createImageData(imageData);
    };
     
    const list = async () => {
        try {
            const eventList = await eventRepo.listEvents();
            if(eventList && eventList.length > 0)
            {
                return {
                    message:"Event List",
                    list:eventList
                }
            }
            else{
                throw new Error("No Event Data Found");
            }
        } catch (error) {
            console.log(`Failed to Fetch Events :${error.message}`);
            throw new Error("Failed to Fetch Event");
        }
    };
    const listById = async (id)=>{
        try {
            if(!id)
            {
                return {
                    message:"Event Id is required",
                    eventData:{}
                }
            }
            const eventdata = await eventRepo.listEventById(id);
            if(eventdata)
            {
                return {
                    message:"Event List",
                    eventData:eventdata
                }
            }
            else{
                throw new Error("No Event Data Found");
            }

        } catch (error) {
             console.log(`Failed to Fetch Events :${error.message}`);
            throw new Error("Failed to Fetch Event");
        }
    }
    // const remove = async (id) => {
    //     return await eventRepo.findById(id);
    // };
    // const update = async (id, eventData) => {
    //     return await eventRepo.update(id, eventData);
    // };  

    return { create,list,listById};
};
export default eventService;