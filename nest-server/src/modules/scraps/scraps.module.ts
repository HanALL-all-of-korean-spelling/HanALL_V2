import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scrap } from 'src/entities/Scrap.entity';
import { WordPost } from 'src/entities/WordPost.entity';
import { PostsModule } from '../posts/posts.module';
import { PostsRepsitory } from '../posts/posts.repository';
import { ScrapsController } from './scraps.controller';
import { ScrapsRepository } from './scraps.repository';
import { ScrapsService } from './scraps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scrap]), PostsModule],
  controllers: [ScrapsController],
  providers: [ScrapsService, ScrapsRepository],
})
export class ScrapsModule {}
