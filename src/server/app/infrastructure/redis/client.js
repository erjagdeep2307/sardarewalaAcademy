import {Redis} from "ioredis";
import logger from "#logger";
const RedisClient = Redis();
RedisClient.on("connect",() => logger.info("Connected To Redis "));
RedisClient.on("error",(err) => logger.error(err,"Redis Error") );
export {RedisClient}; 