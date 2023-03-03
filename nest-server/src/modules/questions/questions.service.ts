import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { CreateQuestionDto } from './dto/questions.req.dto';
import { QuestionsRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async createQuestion(user: User, createQuestionDto: CreateQuestionDto) {
    const question = await this.questionsRepository.create(
      user,
      createQuestionDto,
    );
    if (!question) {
      throw new InternalServerErrorException('문의글 작성에 실패했습니다.');
    }
    return true;
  }
}
