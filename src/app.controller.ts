import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('redisTest')
  async testRedis() {
    return this.appService.testRedisConnection();
  }

  @Post('syncSend')
  async syncSend(@Body() data: { message: string }) {
    console.log('---------------同步操作---------------');
    console.log('Controller 收到請求');
    return this.appService.syncSend(data);
  }

  @Post('sendToQueue')
  async sendToQueue(@Body() data: { message: string }) {
    console.log('---------------非同步操作---------------');
    console.log('Controller 收到請求');
    return this.appService.sendToQueue(data);
  }
}
