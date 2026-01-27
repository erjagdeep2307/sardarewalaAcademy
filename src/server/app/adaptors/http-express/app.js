import express from 'express';
import cors from 'cors'
import eventRouter from '#events/event.route';
import testomonialRouter from '#testomonial/testomonial.route';
import contactRouter from '#contacts/contact.route';
import { multerErrorHandler } from '../../infrastructure/multerError/multerErrorHandler.js';
import helmet  from 'helmet'
const app = express();
app.set('trust proxy',1); // Seting up to prevent the unattentional behaviour of rate-limit in proxy mode
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://172.17.222.128:5173',
    methods:['GET','POST','PUT','DELETE']
}));
// app.use(requestLogger)
app.use('/api/events', eventRouter);
app.use('/api/testomonials', testomonialRouter);
app.use('/api/contact', contactRouter);

app.all('/*splat', (req, res) => {
    res.status(404).send({ message: 'Route Not Found' });
});
app.use(multerErrorHandler);
export default app;