import logger from "#logger";
import { contactSchema, updateStatusSchema } from "#contacts/contact.validation";
import { success } from "zod";
const ContactController = (contactService) => {
    const createContact = async (req, res, next) => {
        try {
            const contactData = req.body;
            logger.info(contactData, 'Received contact creation request');
            const validatedData = contactSchema.safeParse(contactData);
            if (validatedData.success === false) {
                logger.error(validatedData.error.flatten().fieldErrors, 'Validation failed for contact creation');
                return res.status(400).json(
                    { 
                        status: 'error',
                        message: 'Invalid Request data',
                        errors: validatedData.error.flatten().fieldErrors });
            }
            const result = await contactService.createContact(validatedData.data);
            logger.info(result, 'Contact created successfully');
            res.status(201).json({ success: true, message: 'Contact created successfully', data: result });
        } catch (error) {
            next(error);
        }
    }

    const fetchContacts = async (req, res, next) => {
        try {
            const contacts = await contactService.listContacts();
            logger.info(contacts, 'Contacts fetched successfully');

            res.status(200).json({
                success: true,
                message: `${((contacts.length) > 0) ? "Contacts fetched successfully" : "No Contacts Found"}`,
                data: contacts
            });
        } catch (error) {
            logger.error(error, 'Error fetching contacts');
            next(error);
        }
    }

    const updateContact = async (req, res, next) => {
        try {

            const recordId = req.params.id;
            if (!recordId) {
                return res.status(400).json({
                    success: false,
                    message: "Missing contact id or Invalid contact Id"
                })
            }
            const payload = updateStatusSchema.safeParse(req.body);
            if (!payload.success) {
                console.error("Validation Failed for Contact Update. Errors: ", payload.error.flatten().fieldErrors);
                return res.status(400).json({ error: 'Invalid contact data', details: validatedData.error.flatten().fieldErrors });
            }
            const response = await contactService.updateStatus(recordId, payload.data);
            if (!response) {
                res.status(200).json({
                    success: true,
                    message: "Record is not Updated for given Id",
                })
            }
            res.status(200).json({
                success: true,
                message: "Contact Updated Successfully",
                data: response
            })
        } catch (error) {
            next(error);
        }
    }
    return {
        createContact,
        fetchContacts,
        updateContact
    };
}
export default ContactController;