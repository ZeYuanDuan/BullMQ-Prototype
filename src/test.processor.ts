import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

// 監聽佇列 test-queue
@Processor('test-queue')
export class TestProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log(`Consumer 取得任務 ${job.id}，開始執行`);
    console.log('等待 5 秒......');
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 延遲 5 秒
    console.log(`訊息已送出：${JSON.stringify(job.data)}`);
    console.log(`Consumer 完成任務 ${job.id}`);
  }
}
