import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-redis')
  async testRedis() {
    return this.appService.testRedisConnection();
  }

  @Post('send')
  async sendMessage(@Body() data: unknown) {
    return this.appService.sendToQueue(data);
  }
}
