import express from 'express';
import eventRouter from '#events/event.route';
const app = express();
app.use(express.json());
app.use('/events', eventRouter);
export default app;