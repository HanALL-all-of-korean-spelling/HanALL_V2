import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { User } from 'src/entities/User.entity';
import { AnswersRepository } from '../answers/answers.repository';
import { CreateQuestionDto } from './dto/questions.req.dto';
import { QuestionsRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

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

  async getQuestion(page: number) {
    let questionList: any = await this.questionsRepository.findMany(page);
    for (let i = 0; i < questionList.length; i++) {
      const answerCheck = await this.answersRepository.findOneByQuestionId(
        questionList[i].id,
      );
      if (answerCheck) questionList[i].answerId = answerCheck.id;
      else questionList[i].answerId = null;
    }
    return questionList;
  }

  async modifyQuestion(
    questionId: number,
    user: User,
    updateQuestionDto: CreateQuestionDto,
  ) {
    const question = await this.questionsRepository.findOneById(questionId);
    if (!question) {
      throw new NotFoundException('해당 문의글을 찾을 수 없습니다.');
    }
    if (question.user.id !== user.id) {
      throw new ForbiddenException(
        '자신이 작성한 문의글만 수정할 수 있습니다.',
      );
    }
    const updateQuestion = await this.questionsRepository.update(
      questionId,
      updateQuestionDto,
    );
    if (!updateQuestion) {
      throw new InternalServerErrorException('문의글 수정에 실패했습니다.');
    }
  }

  async deleteQuestion(questionId: number, user: User) {
    const question = await this.questionsRepository.findOneById(questionId);
    if (!question) {
      throw new NotFoundException('해당 문의글을 찾을 수 없습니다.');
    }
    if (question.user.id !== user.id) {
      throw new ForbiddenException(
        '자신이 작성한 문의글만 삭제할 수 있습니다.',
      );
    }
    const deleteQuestion = await this.questionsRepository.delete(questionId);
    if (!deleteQuestion) {
      throw new InternalServerErrorException('문의글 삭제에 실패했습니다.');
    }
  }
}
