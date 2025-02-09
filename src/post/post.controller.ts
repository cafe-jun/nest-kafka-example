import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FindManyPostDto } from './dto/find-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: '게시글 추가',
  })
  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    await this.postService.createPost(dto);
  }
  @ApiOperation({
    summary: '게시글 조회',
  })
  @Get()
  async getPost(@Query() query: FindManyPostDto) {
    return await this.postService.getPost(query);
  }

  @ApiOperation({
    summary: '게시글 상세보기 정보 ',
  })
  @Get(':id')
  async getPostDetail(@Param('id') id: number) {
    return await this.postService.getDetail(id);
  }
}
