import { Module } from '@nestjs/common';
import { ClientsModule, Transport, MessagePattern, Payload, MqttContext, Ctx } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
          {
            name: 'MATH_SERVICE',
            transport: Transport.MQTT,
            options: {
              url: 'mqtt://test.mosquitto.org:1883',
            }
          },
        ]),
    ]
})
export class ClientModule {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('notifications')
    getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
        console.log(`Topic: ${context.getTopic()}`);
    }
}
