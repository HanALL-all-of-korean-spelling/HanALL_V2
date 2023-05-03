import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordPost } from 'src/entities/WordPost.entity';
import { PostsRepsitory } from './posts.repository';
import { RightWordRepository } from '../words/repositories/rightWord.repository';
import { RightWord } from 'src/entities/RightWord.entity';
import { WrongWord } from 'src/entities/WrongWord.entity';
import { WrongWordRepository } from '../words/repositories/wrongWord.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WordPost, RightWord, WrongWord])],
  providers: [
    PostsService,
    PostsRepsitory,
    RightWordRepository,
    WrongWordRepository,
  ],
  controllers: [PostsController],
  exports: [PostsRepsitory],
})
export class PostsModule {}
