import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordType } from 'src/entities/enums/wordType.enum';
import { RightWord } from 'src/entities/RightWord.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RightWordRepository {
  constructor(
    @InjectRepository(RightWord)
    private rightWordRepository: Repository<RightWord>,
  ) {}

  async findOneById(id: number): Promise<RightWord> {
    return this.rightWordRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<RightWord> {
    return this.rightWordRepository.findOneBy({ name });
  }

  async create(name: string, type: WordType): Promise<number> {
    try {
      const newWord = this.rightWordRepository.create({
        name: name,
        type: type,
      });
      const newWordId = await this.rightWordRepository.save(newWord);
      return newWordId.id;
    } catch (err) {
      console.log('CREATE RIGHT WORD', err);
      return 0;
    }
  }
}
