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
    return {
        createContact,
        listContacts
    };
}
export default ContactService;