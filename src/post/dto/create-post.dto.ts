// post 에 대한 정의를 해보자

import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly content: string;
}
