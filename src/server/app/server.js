import 'dotenv/config';
import fs from 'fs';
import app from './adaptors/http-express/app.js';
import { connectDB } from '#db';
const PORT = process.env.APP_PORT || 5935;
// Check out the initial connection to Database if it is able to make connection or not
await connectDB();

// const result =  await uploadImage(fileBuffer,'events');
// console.log(result);


app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
}); 