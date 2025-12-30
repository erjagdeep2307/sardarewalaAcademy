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
        // return result;

        // return await cloudService.uploadImage(image.buffer);
        // const result  = await eventRepo.createEvent(eventData);
    };
     
    // const list = async () => {
    //     return await eventRepo.findAll();
    // };
    // const remove = async (id) => {
    //     return await eventRepo.findById(id);
    // };
    // const update = async (id, eventData) => {
    //     return await eventRepo.update(id, eventData);
    // };  

    return { create};
};
export default eventService;