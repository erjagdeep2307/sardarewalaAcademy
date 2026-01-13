import express from 'express';
import cors from 'cors'
import eventRouter from '#events/event.route';
import testomonialRouter from '#testomonial/testomonial.route';
import { multerErrorHandler } from '../../infrastructure/multerError/multerErrorHandler.js';
import requestLogger from '../middleware/logMiddleware.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(requestLogger)
app.use('/events', eventRouter);
app.use('/testomonials', testomonialRouter);
app.use(multerErrorHandler);
export default app;