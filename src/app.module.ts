import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PopularPostsModule } from './popular-posts/popular-posts.module';
import { PrismaModule } from 'nestjs-prisma';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    PostModule,
    PopularPostsModule,
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: [{ emit: 'event', level: 'query' }],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
