import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { User } from 'src/entities/User.entity';
import { PostsRepsitory } from '../posts/posts.repository';
import { WrongWordRepository } from '../words/repositories/wrongWord.repository';
import { ScrapsRepository } from './scraps.repository';

@Injectable()
export class ScrapsService {
  constructor(
    private scrapsRepository: ScrapsRepository,
    private postsRepository: PostsRepsitory,
    private wrongWordRepository: WrongWordRepository,
  ) {}

  async createScrap(user: User, postId: number) {
    const post = await this.postsRepository.findOneById(postId);
    if (!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    const scrapCheck = await this.scrapsRepository.findOne(user.id, postId);
    if (scrapCheck) {
      throw new BadRequestException('이미 보관한 게시글입니다.');
    }
    const newScrap = await this.scrapsRepository.create(user, post);
    if (!newScrap) {
      throw new InternalServerErrorException('보관에 실패했습니다.');
    }
    return true;
  }
  async getScrapList(user: User) {
    return await this.scrapsRepository.findManyByUserId(user.id);
  }

  async deleteScrap(user: User, scrapId: number) {
    const scrap = await this.scrapsRepository.findOneById(scrapId);
    if (!scrap) {
      throw new BadRequestException('해당 보관 내역이 존재하지 않습니다.');
    }
    if (scrap.user.id !== user.id) {
      throw new ForbiddenException('삭제할 수 없는 보관글입니다.');
    }
    const deleteScrap = await this.scrapsRepository.delete(scrapId);
    if (!deleteScrap) {
      throw new InternalServerErrorException('보관글 삭제에 실패했습니다.');
    }
    return true;
  }

  async getTestList(user: User) {
    const scrapList = await this.scrapsRepository.findManyRandomOrder(user.id);
    let testList = [];
    for (let i = 0; i < scrapList.length; i++) {
      const wrongWordList =
        await this.wrongWordRepository.findManyByRightWordId(
          scrapList[i].post.rightWord.id,
        );
      const wordList = [
        {
          word: scrapList[i].post.rightWord.name,
          isRight: true,
        },
      ];
      for (let j = 0; j < wrongWordList.length; j++) {
        wordList.push({ word: wrongWordList[j].name, isRight: false });
      }
      testList.push({ id: scrapList[i].id, wordList: wordList });
    }
    return testList;
  }
}
