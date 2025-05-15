import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

// 監聽佇列 test-queue
@Processor('test-queue')
export class TestProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 10000)); // 延遲 10 秒
    // 取得任務之後，印出任務的資料
    console.log('Received message:', job.data);
  }
}
