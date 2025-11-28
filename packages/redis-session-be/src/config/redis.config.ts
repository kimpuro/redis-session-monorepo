import { createClient } from 'redis';

export const createRedisClient = (): any => {
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
    password: process.env.REDIS_PASSWORD || undefined,
    database: parseInt(process.env.REDIS_DB || '0', 10),
  });

  redisClient.connect().catch(console.error);

  redisClient.on('connect', () => {
    console.log('✅ Redis connected successfully');
  });

  redisClient.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
  });

  return redisClient;
};

