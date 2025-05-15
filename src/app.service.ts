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

  async sendToQueue(data: unknown): Promise<string> {
    try {
      // 將資料加入佇列，process-data 是任務名稱，data 是要處理的資料
      const job = await this.testQueue.add('process-data', data);
      console.log('job', job);
      return `Message sent with job ID: ${job.id}`;
    } catch (error: unknown) {
      return `Failed to send message: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
}
