import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
