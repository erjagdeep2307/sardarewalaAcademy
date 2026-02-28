import { Pool } from "pg";
import logger from "#logger";
const { DATABASE_URL } = process.env;
if (!DATABASE_URL)
    throw new Error(`Database URL is undefined, make sure the connection string must be in env`);
const connectionPool = new Pool({
    connectionString: DATABASE_URL,
    max: 10,                  // max connections
    idleTimeoutMillis: 30000, // close idle clients
    connectionTimeoutMillis: 5000
});

export const connectDB = async () => {
    try {
        const dbClient = await connectionPool.connect();
        logger.info(`Connected to Database`);
        dbClient.release();
    } catch (error) {
        logger.error(error, `Failed to connect Database`);
        process.exit(1);
    }
}

connectionPool.on('error', (err) => {
    logger.fatal(err,'Unexpected error on idle client');
    process.exit(-1);
});
export default connectionPool;