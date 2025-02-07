import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private readonly consumers: Consumer[] = [];

  async consumer(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'popular-post' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    // await consumer.commitOffsets([{ topi /}]);
    this.consumers.push(consumer);
  }
  async onApplicationShutdown(signal?: string) {
    console.log(signal);
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
