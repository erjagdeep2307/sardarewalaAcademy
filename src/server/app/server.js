import 'dotenv/config';
import app from './adaptors/http-express/app.js';
import { connectDB } from '#db';
const PORT = process.env.APP_PORT || 5935;
// Check out the initial connection to Database if it is able to make connection or not
await connectDB();
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 

// Applied Global Exception Handler in case of Any Uncaught Exception

process.on('uncaughtException',(err)=>{
    console.error(`Got an Exception :${err.message}`);
    exit(1);
})