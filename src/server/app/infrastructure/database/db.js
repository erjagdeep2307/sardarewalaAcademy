import {Pool} from "pg";
// console.log('Database URL:', process.env.DATABASE_URL);
const connectionPool = new Pool({
    connectionString: "postgresql://admin:MG8wTxOzz-0u9SkyOg9jpUpP8QYkb-@asia-south2.e153cc99-a6b2-47d9-8a97-5c272c1e4977.gcp.yugabyte.cloud:5433/sptadb?ssl=true&sslmode=verify-full&sslrootcert=root.crt",
     max: 10,                  // max connections
     idleTimeoutMillis: 30000, // close idle clients
     connectionTimeoutMillis: 5000
});
connectionPool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
export default connectionPool;