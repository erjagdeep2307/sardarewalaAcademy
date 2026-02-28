import Router from 'express';
import ContactController from '#controllers/ContactController';
import ContactRepo from '#contacts/contact.repo';
import ContactService from '#contacts/contact.service';
import connectionPool from '#db';
import { AuthGuard } from '#middleware/VerifyAccessToken';
const contactRouter = Router();
const ContactRepoInstance = ContactRepo(connectionPool);
const ContactServiceInstance = ContactService(ContactRepoInstance);
const ContactCtrlInstance = ContactController(ContactServiceInstance);

contactRouter.post('/',ContactCtrlInstance.createContact);
contactRouter.get('/',AuthGuard,ContactCtrlInstance.fetchContacts);
contactRouter.patch('/:id',AuthGuard,ContactCtrlInstance.updateContact);

export default contactRouter;