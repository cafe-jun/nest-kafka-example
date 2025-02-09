import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePostDto } from './dto/create-post.dto';
import { PostMapper } from './post.mapper';
import { FindManyPostDto } from './dto/find-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPost(query: FindManyPostDto) {
    const post = await this.prismaService.post.findMany({
      skip: query.skip,
      take: query.take,
    });
    return post;
  }

  async createPost(dto: CreatePostDto) {
    const entity = PostMapper.toEntity(dto);
    const result = await this.prismaService.post.create({
      data: entity,
    });
    return { id: result.id };
  }

  async getDetail(postId: number) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: postId,
      },
    });
    return post;
  }
}
