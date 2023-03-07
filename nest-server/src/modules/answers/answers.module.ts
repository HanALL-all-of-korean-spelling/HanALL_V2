import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/entities/Answer.entity';
import { Question } from 'src/entities/Question.entity';
import { QuestionsRepository } from '../questions/questions.repository';
import { AnswersController } from './answers.controller';
import { AnswersRepository } from './answers.repository';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  controllers: [AnswersController],
  providers: [AnswersService, AnswersRepository, QuestionsRepository],
})
export class AnswersModule {}
