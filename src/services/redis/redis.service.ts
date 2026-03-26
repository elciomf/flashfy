import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export const redisService = () => {
  const save = async (key: string, value: string) => {
    await redis.set(key, value, "EX", 600);
  };

  const read = async (key: string) => {
    return await redis.get(key);
  };

  const wipe = async (key: string) => {
    await redis.del(key);
  };

  return { save, read, wipe };
};
