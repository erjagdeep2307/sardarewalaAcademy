import 'dotenv/config';
import fs from 'fs';
import app from './adaptors/http-express/app.js';
import { connectDB } from '#db';
<<<<<<< HEAD
const PORT = process.env.APP_PORT || 3420;
=======
const PORT = process.env.APP_PORT || 5935;
>>>>>>> b954b4e77701a6da9677cab2531b4f46cb644dd8
// Check out the initial connection to Database if it is able to make connection or not
await connectDB();

// const result =  await uploadImage(fileBuffer,'events');
// console.log(result);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 