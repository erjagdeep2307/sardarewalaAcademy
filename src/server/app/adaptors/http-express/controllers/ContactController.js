import logger from "#logger";
import { contactSchema, updateStatusSchema } from "#contacts/contact.validation";
const ContactController = (contactService) => {
    const createContact = async (req,res,next) => {
        try {
            logger.info('Received contact creation request');
            const contactData = req.body;
            console.log(contactData);
            const validatedData = contactSchema.safeParse(contactData);
            if (validatedData.success === false) {
                console.log(validatedData.error.flatten().fieldErrors);
                return res.status(400).json({ error: 'Invalid contact data', details: validatedData.error.flatten().fieldErrors });
            }
            const result = await contactService.createContact(validatedData.data);
            res.status(201).json({ message: 'Contact created successfully', data: result });
        } catch (error) {
            next(error);
        }
    }

    const fetchContacts = async (req,res,next) => {
        try {
            const contacts = await contactService.listContacts();
            console.log('Contacts fetched:', contacts.length);

            res.status(200).json({
                success: true,
                message: `${((contacts.length) > 0) ? "Contacts fetched successfully" : "No Contacts Found"}`,
                data: contacts
            });
        } catch (error) {
            next(error);
        }
    }

    const updateContact = async (req, res, next) => {
        try {
            const recordId = Number(req.params.id);
            if (Number.isNaN(recordId)) {
                res.status(400).json({
                    success: false,
                    message: "Missing contact id or Invalid contact Id"
                })
            }
            const payload = updateStatusSchema.safeParse(req.body);
            if (!payload.success) {
                res.status(400).json({
                    success: false,
                    message: "Payload Validation Failed for Contact Update"
                });
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