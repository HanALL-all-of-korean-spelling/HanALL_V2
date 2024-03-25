import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { WordType } from 'src/entities/enums/wordType.enum';

export class CreatePostReqDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  helpfulInfo: string;

  @ApiProperty()
  @IsString()
  rightWord: string;

  @ApiProperty()
  @IsEnum(WordType)
  type: WordType;

  @ApiProperty({ type: [String] })
  @IsArray()
  wrongWords: string[];
}
