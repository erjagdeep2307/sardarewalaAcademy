// Event Service
const eventService = (eventRepo,cloudService) => {
    // Logic to create an event in the database
    const create = async (eventData) => {
            // return await eventRepo.createEvent(eventData);
            return await cloudService.uploadImage((eventData.event_image).buffer);
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