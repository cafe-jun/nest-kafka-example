import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaOptions, Transport } from '@nestjs/microservices';

process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1'; // 경고 메시지 비활성화

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaOption: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'popular-posts-consumer',
      },
    },
  };
  app.connectMicroservice(kafkaOption);
  await app.startAllMicroservices();
  await app.listen(+process.env.PORT || 3000);
}
bootstrap();
