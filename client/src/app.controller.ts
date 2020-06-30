import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientMqtt } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE')
    private readonly client: ClientMqtt
  ) {
    this.client.connect()
  }

  @Get()
  getHello(): string {
    this.client.emit('message_printed', 'Hello World')
    return this.appService.getHello();
  }
}
