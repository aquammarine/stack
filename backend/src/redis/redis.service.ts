import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    super(process.env.REDIS_URL!, { maxRetriesPerRequest: null });
  }

  async onModuleDestroy() {
    await this.quit();
  }
}
