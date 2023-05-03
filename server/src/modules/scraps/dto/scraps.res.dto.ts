import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { WordType } from 'src/entities/enums/wordType.enum';

export class GetScrapPostObj {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}

export class GetScrapListResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  post: GetScrapPostObj;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateTime: Date;

  @ApiProperty()
  deleteTime: Date;
}
