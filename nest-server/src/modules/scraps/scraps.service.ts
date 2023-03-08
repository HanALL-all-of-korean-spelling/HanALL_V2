import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { User } from 'src/entities/User.entity';
import { PostsRepsitory } from '../posts/posts.repository';
import { ScrapsRepository } from './scraps.repository';

@Injectable()
export class ScrapsService {
  constructor(
    private scrapsRepository: ScrapsRepository,
    private postsRepository: PostsRepsitory,
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
}
