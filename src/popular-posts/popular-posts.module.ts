import { Module } from '@nestjs/common';
import { PopularPostsController } from './ popular-posts.controller';
import { PopularPostsService } from './ popular-posts.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [PopularPostsService],
  controllers: [PopularPostsController],
})
export class PopularPostsModule {}
