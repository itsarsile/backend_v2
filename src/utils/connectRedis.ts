import { createClient } from 'redis';

const redisUrl = 'redis://default:621a182bf4e143399497844a6901fd6f@cute-foxhound-44103.upstash.io:44103';

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connect successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
