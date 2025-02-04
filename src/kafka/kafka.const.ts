import { Inject } from '@nestjs/common';

export const KafkaQueue = () => {
  return Inject('KAFKA_SERVICE');
};
