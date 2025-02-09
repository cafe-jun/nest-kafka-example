import { Body, Controller, Get } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { PopularPostsService } from './ popular-posts.service';

@Controller()
export class PopularPostsController {
  private POST_ID = 1;
  constructor(private readonly popularPostsService: PopularPostsService) {}

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
