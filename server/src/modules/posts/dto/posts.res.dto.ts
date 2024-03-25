import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { WordType } from 'src/entities/enums/wordType.enum';

export class GetPostListResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  hitCount: number;

  @ApiProperty()
  scrapCount: number;

  @ApiProperty()
  description: string;
}

export class CreatePostResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createTime: Date;
}

export class RightWordInPostDto {
  @ApiProperty()
  name: string;
}

export class WrongWordInPostDto {
  @ApiProperty()
  name: string;
}

export class GetPostResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  helpfulInfo: string;

  @ApiProperty()
  type: WordType;

  @ApiProperty({ type: RightWordInPostDto })
  rightWord: RightWordInPostDto;

  @ApiProperty({ type: [WrongWordInPostDto] })
  wrongWords: WrongWordInPostDto[];

  @ApiProperty()
  hitCount: number;

  @ApiProperty()
  scrapCount: number;

  @ApiProperty()
  relatedPostId: number;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateTime: Date;

  @ApiProperty()
  deleteTime: Date;
}
