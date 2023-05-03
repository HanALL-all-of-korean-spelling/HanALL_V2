import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/Question.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/questions.req.dto';

@Injectable()
export class QuestionsRepository {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async findMany(page: number): Promise<Question[]> {
    const question = await this.questionsRepository.find({
      take: 10 * page,
      skip: 10 * (page - 1),
      order: {
        createTime: 'DESC',
      },
    });
    return question;
  }

  async findOneById(id: number): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
    return question;
  }

  async create(user: User, createQuestionDto: CreateQuestionDto) {
    try {
      const { title, content } = createQuestionDto;
      const newQuestion = this.questionsRepository.create({
        title: title,
        content: content,
        user: user,
      });
      await this.questionsRepository.save(newQuestion);
      return true;
    } catch (err) {
      console.log('CREATE QUESTION', err);
      return false;
    }
  }

  async update(questionId: number, updateQuestionDto: CreateQuestionDto) {
    try {
      const { title, content } = updateQuestionDto;
      const updateQuestion = await this.questionsRepository.update(
        {
          id: questionId,
        },
        {
          title: title,
          content: content,
        },
      );
      if (updateQuestion.affected) return true;
      else return false;
    } catch (err) {
      console.log('UPDATE QUESTION', err);
      return false;
    }
  }

  async delete(questionId: number) {
    try {
      const deleteQuestion = await this.questionsRepository.softDelete({
        id: questionId,
      });
      if (deleteQuestion.affected) return true;
      else return false;
    } catch (err) {
      console.log('DELETE QUESTION', err);
      return false;
    }
  }
}
