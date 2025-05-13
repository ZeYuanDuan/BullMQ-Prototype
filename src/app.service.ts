import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(@InjectQueue('test-queue') private readonly testQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async testRedisConnection(): Promise<string> {
    try {
      // 添加一個測試任務到佇列
      await this.testQueue.add('test-job', { test: 'data' });
      return 'Redis connection successful!';
    } catch (error: unknown) {
      return `Redis connection failed: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
}
