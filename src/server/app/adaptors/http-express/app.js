import cors from 'cors'
import helmet  from 'helmet'
import express from 'express';

import eventRouter from '#events/event.route';
import contactRouter from '#contacts/contact.route';
import testomonialRouter from '#testomonial/testomonial.route';
import authRouter from '#auth/auth.route';
import { generateHash,compareHash } from '#common/hash.service';
import { globalErrorHandler } from '../middleware/GlobalErrorHandler.js';

const app = express();
app.set('trust proxy',1); // Seting up to prevent the unattentional behaviour of rate-limit in proxy mode
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:['http://172.17.222.128:5173','http://localhost:5173'],
    methods:['GET','POST','PUT','DELETE']
}));
app.use('/api/auth',authRouter);
app.use('/api/events', eventRouter);
app.use('/api/testomonials', testomonialRouter);
app.use('/api/contact', contactRouter);
app.post('/passhash', async(req, res) => {
    if(req.body.stringToHash){
        const hashedString =await generateHash(req.body.stringToHash);
        return res.status(200).json({ hashedString });
    }
    else{
        return res.status(400).json({ message: 'Please provide a string to hash in the request body' });
    }
});
app.post('/testhash', async(req, res) => {
    const { plainText, hash } = req.body;
    if(plainText && hash){
        const isMatch = await compareHash(plainText, hash);
        return res.status(200).json({ isMatch });
    }
    else{
        return res.status(400).json({ message: 'Please provide both plainText and hash in the request body' });
    }
});

// app.all('/*splat', (req, res) => {
//     res.status(404).send({ message: 'Route Not Found' });
// });
app.use(globalErrorHandler);

export default app;