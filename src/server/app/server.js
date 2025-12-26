import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import app from './adaptors/http-express/app.js';
console.log('Environment Variable TEST_VAR:', process.env.APP_PORT);
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 