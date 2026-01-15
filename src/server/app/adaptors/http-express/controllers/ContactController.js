import logger from "#logger";
import { contactSchema } from "#contacts/contact.schema";
import { success } from "zod";
const ContactController = (contactService) => {
    const createContact = async (req, res) => {
        try {
            logger.info('Received contact creation request');
            const contactData = req.body;
            console.log(contactData);
            const validatedData = contactSchema.safeParse(contactData);
            if (validatedData.success === false) {
                console.log(validatedData.error.flatten().fieldErrors);
                return res.status(400).json({ error: 'Invalid contact data', details: validatedData.error.flatten().fieldErrors });
            }
            if(contactService)
            {
                logger.info('Contact service is available');
            }
            else{
                logger.error('Contact service is not available');
            }
            const result = await contactService.createContact(validatedData.data);
            res.status(201).json({ message: 'Contact created successfully', data: result });
        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }
    
    const fetchContacts = async (req, res) => {
        try {
            const contacts = await contactService.listContacts();
            console.log('Contacts fetched:', contacts.length);
            
            res.status(200).json({
                success: true,
                message:`${((contacts.length) > 0) ? "Contacts fetched successfully" : "No Contacts Found"}`, 
                data: contacts
             });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch contacts' });
        }
    }
    
    return {
        createContact,
        fetchContacts
    };
}   
export default ContactController;