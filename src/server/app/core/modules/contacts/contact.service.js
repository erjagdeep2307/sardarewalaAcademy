import AppError from "#utilities/AppError";

const ContactService = (contactRepo)=>{
    const createContact = async (contactData) => {
        // Logic to save contactData to database
        const result = await contactRepo.saveContact(contactData);
        if (!result) {
            throw new AppError("Failed to create contact", 400);
        }
        return result;
    };
    
    const listContacts = async () => {
        // Logic to list contacts from database
        return await contactRepo.listContacts();
    };

    const updateStatus = async(recordId, payload) =>{
        return await contactRepo.updateContact(recordId, payload);
    };

    return {
        createContact,
        listContacts,
        updateStatus
    };
}
export default ContactService;