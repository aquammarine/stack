import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  set(key: string, value: string, ttl: number) {
    return this.redis.set(key, value, 'EX', ttl);
  }

  get(key: string) {
    return this.redis.get(key);
  }

  del(key: string) {
    return this.redis.del(key);
  }
}
