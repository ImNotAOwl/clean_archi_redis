import { RedisClientType, createClient } from "redis";

const redisClient: RedisClientType = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export { redisClient };
