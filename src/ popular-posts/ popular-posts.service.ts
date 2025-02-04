import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Cron } from '@nestjs/schedule';
import { Post } from '@prisma/client';
import { DateUtil } from 'src/utils/date.util';
import { KafkaProducerService } from '../kafka/kafka.producer';
import { KafkaConsumerService } from '../kafka/kafka.consumer';

@Injectable()
export class PopularPostsService implements OnModuleInit {
  private readonly postTopic = 'popular-post';
  constructor(
    private readonly prismaService: PrismaService,
    private readonly producerService: KafkaProducerService,
    private readonly consumerService: KafkaConsumerService,
  ) {}
  async onModuleInit() {
    await this.consumerService.consumer(
      { topics: [this.postTopic] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log(
            `topic ${topic}`,
            `partition ${partition}`,
            `message ${JSON.stringify(message)}`,
          );
        },
      },
    );
  }

  createPost({ postId, name }: { postId: number; name: string }) {
    const newPost = { postId, name };
    this.producerService.produce({
      topic: this.postTopic,
      messages: [
        {
          value: JSON.stringify(newPost),
        },
      ],
    });
    return 'This action adds a new post';
  }

  @Cron('0 1 * * *') // 매일 오전 1시
  async updatePopularPosts() {
    await this.prismaService.popularPost.deleteMany();

    await this.prismaService.$transaction(async (tx) => {
      const topPosts = await tx.post.findMany({
        take: 10,
        orderBy: [
          {
            commentCount: 'desc',
          },
          {
            likeCount: 'desc',
          },
          {
            viewCount: 'desc',
          },
        ],
      });
      // 새로운 인기글 저장
      const popularPosts = await tx.popularPost.createMany({
        data: topPosts.map((post) => ({
          postId: post.id,
          score: this.calculateScore(post),
          date: DateUtil.getToday(),
        })),
      });
      console.log('popularPosts :: ', popularPosts);
    });
  }
  private calculateScore(post: Post): number {
    const COMMENT_WEIGHT = 3;
    const VIEW_WEIGHT = 1;
    const LIKE_WEIGHT = 2;

    return (
      post.commentCount * COMMENT_WEIGHT +
      post.viewCount * VIEW_WEIGHT +
      post.likeCount * LIKE_WEIGHT
    );
  }
}
