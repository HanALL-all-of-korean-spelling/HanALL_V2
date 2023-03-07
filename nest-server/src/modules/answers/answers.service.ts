import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { QuestionsRepository } from '../questions/questions.repository';
import { AnswersRepository } from './answers.repository';
import { CreateAnswerDto } from './dto/answers.req.dto';

@Injectable()
export class AnswersService {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async createAnswer(createAnswerDto: CreateAnswerDto) {
    const { questionId, content } = createAnswerDto;
    const question = await this.questionsRepository.findOneById(questionId);
    if (!question) {
      throw new BadRequestException('해당 문의글을 찾을 수 없습니다.');
    }
    const answerCheck = await this.answersRepository.findOneByQuestionId(
      questionId,
    );
    if (answerCheck) {
      throw new BadRequestException('이미 답변이 존재합니다.');
    }
    const answer = await this.answersRepository.create(question, content);
    if (!answer) {
      throw new InternalServerErrorException('답변 작성에 실패했습니다.');
    }
    return true;
  }
}
