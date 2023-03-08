import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsString()
  content: string;
}

export class UpdateAnswerDto {
  @ApiProperty()
  @IsString()
  content: string;
}
