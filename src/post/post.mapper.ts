import { CreatePostDto } from './dto/create-post.dto';
import { Post as PrismaPost } from '@prisma/client';
export class PostMapper {
  public static toEntity(dto: CreatePostDto): Omit<PrismaPost, 'id'> {
    return {
      title: dto.title,
      content: dto.content,
      likeCount: 0,
      viewCount: 0,
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
