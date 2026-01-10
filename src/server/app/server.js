import 'dotenv/config';
import app from './adaptors/http-express/app.js';
import { connectDB } from '#db';
import logger from '#logger';
import requestLogger from './adaptors/middleware/logMiddleware.js';
const PORT = process.env.APP_PORT || 5935;
// Check out the initial connection to Database if it is able to make connection or not
await connectDB();
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 