import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const appPort = process.env.APP_PORT || 3450;
app.get('/',(req,res)=>{
    res.send('hellow');
});
app.listen(appPort,()=>{
    console.log(`Server is running ${appPort}`);
})