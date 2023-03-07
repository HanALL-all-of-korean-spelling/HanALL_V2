import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/entities/Answer.entity';
import { Question } from 'src/entities/Question.entity';
import { AnswersRepository } from '../answers/answers.repository';
import { QuestionsController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsRepository, AnswersRepository],
})
export class QuestionsModule {}
