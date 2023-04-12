import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { WordType } from 'src/entities/enums/wordType.enum';

export class GetPostListResDto {
  @ApiProperty()
  @IsEmail()
  id: number;

  @ApiProperty()
  @IsEmail()
  title: string;

  @ApiProperty()
  @IsDate()
  createTime: Date;

  @ApiProperty()
  @IsNumber()
  hitCount: number;

  @ApiProperty()
  @IsNumber()
  scrapCount: number;
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
