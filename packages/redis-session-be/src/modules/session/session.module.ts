import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
import { createRedisClient } from '../../config/redis.config';

@Module({})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const redisClient = createRedisClient();

    consumer
      .apply(
        session({
          store: new RedisStore({ 
            client: redisClient as any,
            prefix: 'sess:',
          }),
          secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24, // 24시간
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

