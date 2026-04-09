import { RedisClient } from "./client";
const RedisService = async() =>{
    const addQueueItem = async(itemKey,itemRecord) => {
        await RedisClient.lpush(itemKey,itemRecord);
    }
    return {addQueueItem};
}
export default RedisService;

