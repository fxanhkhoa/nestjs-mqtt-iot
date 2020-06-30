import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, Ctx, MqttContext, ClientMqtt } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE')
    private readonly client: ClientMqtt
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @MessagePattern('message_printed')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getPrinted(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
    console.log(data)
    this.client.emit('message_control', 'run now')
  }
}
