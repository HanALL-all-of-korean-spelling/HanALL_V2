import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordType } from 'src/entities/enums/wordType.enum';
import { RightWord } from 'src/entities/RightWord.entity';
import { WrongWord } from 'src/entities/WrongWord.entity';
import { Repository } from 'typeorm';
import { RightWordRepository } from './rightWord.repository';

@Injectable()
export class WrongWordRepository {
  constructor(
    @InjectRepository(WrongWord)
    private wrongWordRepository: Repository<WrongWord>,
    private rightWordRepository: RightWordRepository,
  ) {}

  async findManyByRightWordId(rightWordId: number) {
    return this.wrongWordRepository.find({
      where: { rightWord: { id: rightWordId } },
      select: {
        name: true,
      },
    });
  }

  async create(name: string, rightWordId: number) {
    try {
      const rightWord = await this.rightWordRepository.findOneById(rightWordId);
      const newWord = this.wrongWordRepository.create({
        name: name,
        rightWord: rightWord,
      });
      await this.wrongWordRepository.save(newWord);
      return true;
    } catch (err) {
      console.log('CREATE WRONG WORD', err);
      return false;
    }
  }
}
