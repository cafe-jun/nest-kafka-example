import { Controller, Get } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { PopularPostsService } from './ popular-posts.service';

@Controller()
export class PopularPostsController {
  private POST_ID = 1;
  constructor(private readonly popularPostsService: PopularPostsService) {}

  @Get('post')
  async createPost() {
    console.log('test');
    this.POST_ID += 1;
    await this.popularPostsService.createPost({
      postId: this.POST_ID,
      name: `Test Post ${this.POST_ID}`,
    });
    for (let i = 0; i < 10000000; i++) {
      if (i === 10000) {
        console.log('index ', i);
      }
      if (i === 90000) {
        console.log('index ', i);
      }
    }
  }

  async handlePostView(@Payload() data: any) {
    console.log(data);
    // 조회수 증가 이벤트 처리
  }

  async handlePostComment(@Payload() data: any) {
    console.log(data);
    // 댓글 작성 이벤트 처리
  }

  async handlePostLike(@Payload() data: any) {
    console.log(data);
    // 좋아요 이벤트 처리
  }
}
