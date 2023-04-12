import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/entities/Answer.entity';
import { Question } from 'src/entities/Question.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/answers.req.dto';

@Injectable()
export class AnswersRepository {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  async findOneById(id: number): Promise<Answer> {
    return await this.answersRepository.findOne({
      where: { id: id },
    });
  }

  async findOneByQuestionId(questionId: number): Promise<Answer> {
    const answer = await this.answersRepository.findOne({
      where: { question: { id: questionId } },
      relations: {
        question: true,
      },
    });
    return answer;
  }

  async create(qustion: Question, content: string) {
    try {
      const newAnswer = this.answersRepository.create({
        content: content,
        question: qustion,
      });
      await this.answersRepository.save(newAnswer);
      return true;
    } catch (err) {
      console.log('CREATE ANSWER', err);
      return false;
    }
  }

  async update(answerId: number, content: string) {
    try {
      const updateAnswer = await this.answersRepository.update(
        {
          id: answerId,
        },
        {
          content: content,
        },
      );
      if (updateAnswer.affected) return true;
      else return false;
    } catch (err) {
      console.log('UPDATE ANSWER', err);
      return false;
    }
  }

  async delete(answerId: number) {
    try {
      const deleteAnswer = await this.answersRepository.softDelete({
        id: answerId,
      });
      if (deleteAnswer.affected) return true;
      else return false;
    } catch (err) {
      console.log('DELETE ANSWER', err);
      return false;
    }
  }
}
