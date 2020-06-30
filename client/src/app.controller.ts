import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientMqtt, MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';

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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @MessagePattern('message_control')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getPrinted(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
    console.log(data)
  }
}
