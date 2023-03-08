import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { QuestionsRepository } from '../questions/questions.repository';
import { AnswersRepository } from './answers.repository';
import { CreateAnswerDto, UpdateAnswerDto } from './dto/answers.req.dto';

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
      throw new NotFoundException('해당 문의글을 찾을 수 없습니다.');
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

  async getAnswer(id: number) {
    const answer = await this.answersRepository.findOneById(id);
    if (!answer) {
      throw new NotFoundException('해당 답변을 찾을 수 없습니다.');
    }
    return answer;
  }

  async modifyAnswer(id: number, updateAnswerDto: UpdateAnswerDto) {
    const { content } = updateAnswerDto;
    const answer = await this.answersRepository.findOneById(id);
    if (!answer) {
      throw new NotFoundException('해당 답변을 찾을 수 없습니다.');
    }
    const updateAnswer = await this.answersRepository.update(id, content);
    if (!updateAnswer) {
      throw new InternalServerErrorException('답변 수정에 실패했습니다.');
    }
    return true;
  }

  async deleteAnswer(id: number) {
    const answer = await this.answersRepository.findOneById(id);
    if (!answer) {
      throw new NotFoundException('해당 답변을 찾을 수 없습니다.');
    }
    const deleteAnswer = await this.answersRepository.delete(id);
    if (!deleteAnswer) {
      throw new InternalServerErrorException('답변 삭제에 실패했습니다.');
    }
    return true;
  }
}
