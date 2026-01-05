import express from 'express';
import cors from 'cors'
import eventRouter from '#events/event.route';
import { multerErrorHandler } from '../../infrastructure/multerError/multerErrorHandler.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/events', eventRouter);
app.use(multerErrorHandler);
export default app;