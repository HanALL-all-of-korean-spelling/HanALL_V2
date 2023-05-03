import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsString } from 'class-validator';
import { WordType } from 'src/entities/enums/wordType.enum';

export class CreatePostDbDto {
  title: string;
  description: string;
  helpfulInfo: string;
  rightWordId: number;
}
