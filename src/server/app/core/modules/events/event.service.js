// Event Service
const eventService = (eventRepo) => {
    // Logic to create an event in the database
    const create = async (eventData) => {
        return await eventRepo.createEvent(eventData);
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