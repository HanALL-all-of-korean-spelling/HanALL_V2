import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scrap } from 'src/entities/Scrap.entity';
import { WordPost } from 'src/entities/WordPost.entity';
import { WrongWord } from 'src/entities/WrongWord.entity';
import { PostsModule } from '../posts/posts.module';
import { PostsRepsitory } from '../posts/posts.repository';
import { WrongWordRepository } from '../words/repositories/wrongWord.repository';
import { WordsModule } from '../words/words.module';
import { ScrapsController } from './scraps.controller';
import { ScrapsRepository } from './scraps.repository';
import { ScrapsService } from './scraps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scrap]), PostsModule, WordsModule],
  controllers: [ScrapsController],
  providers: [ScrapsService, ScrapsRepository],
})
export class ScrapsModule {}
