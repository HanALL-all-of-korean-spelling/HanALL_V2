import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RightWord } from 'src/entities/RightWord.entity';
import { WrongWord } from 'src/entities/WrongWord.entity';
import { RightWordRepository } from './repositories/rightWord.repository';
import { WrongWordRepository } from './repositories/wrongWord.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RightWord, WrongWord])],
  providers: [RightWordRepository, WrongWordRepository],
  exports: [RightWordRepository, WrongWordRepository],
})
export class WordsModule {}
