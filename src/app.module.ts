import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'products',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'products-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
