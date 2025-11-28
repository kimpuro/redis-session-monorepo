import { createClient } from 'redis';

// Redis 클라이언트 생성
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

// 에러 핸들링
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// 연결 상태 로깅
redisClient.on('connect', () => {
  console.log('Redis Client Connected');
});

// Redis 연결 초기화
let isConnecting = false;
let isConnected = false;

export async function getRedisClient() {
  if (isConnected) {
    return redisClient;
  }

  if (!isConnecting) {
    isConnecting = true;
    try {
      await redisClient.connect();
      isConnected = true;
      isConnecting = false;
    } catch (error) {
      isConnecting = false;
      console.error('Failed to connect to Redis:', error);
      throw error;
    }
  } else {
    // 연결 중일 때 대기
    while (isConnecting) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return redisClient;
}

export default redisClient;

