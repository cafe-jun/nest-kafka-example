import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class BasePagination {
  @ApiProperty({
    title: '페이지 번호',
    example: 1,
    description: '페이지 번호',
  })
  @IsInt()
  @Type(() => Number)
  readonly pageNo: number;
  @ApiProperty({
    title: '페이지 row 개수',
    example: 10,
    description: '페이지 row 개수',
  })
  @IsInt()
  @Type(() => Number)
  readonly pageCount: number;

  get skip(): number {
    return (+this.pageNo - 1) * +this.pageCount;
  }

  get take(): number {
    return +this.pageCount;
  }

  getDESCtNownum() {
    return this.pageNo;
  }
}
