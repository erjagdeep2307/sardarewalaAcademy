const ContactService = (contactRepo)=>{
    const createContact = async (contactData) => {
        console.log('Creating contact with data:', contactData);
        // Logic to save contactData to database
        return await contactRepo.saveContact(contactData);
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