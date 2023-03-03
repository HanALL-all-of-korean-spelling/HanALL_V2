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
      order: {
        createTime: 'DESC',
      },
    });
    return question;
  }

  async findOneById(id: number): Promise<Question> {
    const question = await this.questionsRepository.findOneBy({ id });
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
}
