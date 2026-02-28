import 'dotenv/config';
import app from './adaptors/http-express/app.js';
import { connectDB } from '#db';
import logger from '#logger';
const PORT = process.env.APP_PORT || 5935;
// Check out the initial connection to Database if it is able to make connection or not
logger.info(`Testing Initial Connection to Database`);
await connectDB();
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Applied Global Exception Handler in case of Any Uncaught Exception

process.on('uncaughtException', (err) => {
  logger.fatal(err, `Got an unexpected Error`);
  process.exit(1);
})