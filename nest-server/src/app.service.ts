import { Injectable } from '@nestjs/common';
import { wordsData } from 'words-data';
import { workerData } from 'worker_threads';
import { WordType } from './entities/enums/wordType.enum';
import { CreatePostDbDto } from './modules/posts/dto/posts.db.dto';
import { PostsRepsitory } from './modules/posts/posts.repository';
import { RightWordRepository } from './modules/words/repositories/rightWord.repository';
import { WrongWordRepository } from './modules/words/repositories/wrongWord.repository';

@Injectable()
export class AppService {}
