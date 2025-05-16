import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  // 注入訊息佇列 test-queue
  constructor(@InjectQueue('test-queue') private readonly testQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async testRedisConnection(): Promise<string> {
    try {
      // 添加一個測試任務到佇列，任務名稱
      await this.testQueue.add('test-job', { test: 'data' });
      return 'Redis connection successful!';
    } catch (error) {
      console.error('Redis connection failed', error);
      return 'Redis connection failed';
    }
  }

  async syncSend(data: { message: string }): Promise<string> {
    try {
      console.log('Service 開始執行');

      console.log('等待 5 秒......');

      await new Promise((resolve) => setTimeout(resolve, 5000));

      console.log(`訊息已送出：${data.message}`);

      return `訊息已送出：${data.message}`;
    } catch (error) {
      console.error('同步操作：訊息送出失敗', error);

      return `訊息送出失敗：${error}`;
    }
  }

  async sendToQueue(data: { message: string }): Promise<string> {
    try {
      console.log('Service 開始執行');

      const taskName = 'process-data';

      console.log(`將任務加入佇列，任務名稱：${taskName}`);

      const job = await this.testQueue.add(taskName, data);

      console.log(`任務已加入佇列，任務名稱：${job.name}，任務ID：${job.id}`);

      return `任務已加入佇列，任務名稱：${job.name}，任務ID：${job.id}`;
    } catch (error) {
      console.error('非同步操作：訊息送出失敗', error);

      return `訊息送出失敗：${error}`;
    }
  }
}
