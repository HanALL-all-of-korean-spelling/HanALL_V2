import { Injectable } from '@nestjs/common';
import { wordsData } from 'words-data';
import { workerData } from 'worker_threads';
import { WordType } from './entities/enums/wordType.enum';
import { CreatePostDbDto } from './modules/posts/dto/posts.db.dto';
import { PostsRepsitory } from './modules/posts/posts.repository';
import { RightWordRepository } from './modules/words/repositories/rightWord.repository';
import { WrongWordRepository } from './modules/words/repositories/wrongWord.repository';

@Injectable()
export class AppService {
  constructor(
    private rightWordRepository: RightWordRepository,
    private wrongWordRepository: WrongWordRepository,
    private postsRepository: PostsRepsitory,
  ) {}

  async insertWordsData() {
    console.log('length', wordsData.length);
    let num: number = 0;
    for (let word of wordsData) {
      console.log(num);
      const wordType =
        word.type === 'spelling' ? WordType.spelling : WordType.spacing;
      const rightWordId = await this.rightWordRepository.create(
        word.right_words,
        wordType,
      );
      for (let wrongWord of word.wrong_words) {
        await this.wrongWordRepository.create(wrongWord, rightWordId);
      }
      const createPostDto: CreatePostDbDto = {
        title: word.title,
        description: word.description,
        helpfulInfo: word.helpful_info,
        rightWordId: rightWordId,
      };
      await this.postsRepository.create(createPostDto);
      num++;
    }
  }
}
