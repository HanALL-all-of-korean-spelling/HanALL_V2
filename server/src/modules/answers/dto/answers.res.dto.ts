import { ApiProperty } from '@nestjs/swagger';

export class AnswerResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateTime: Date;

  @ApiProperty()
  deleteTime: Date;
}

export class QuestionIdResDto {
  @ApiProperty()
  questionId: number;
}
