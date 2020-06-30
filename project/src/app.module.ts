import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}