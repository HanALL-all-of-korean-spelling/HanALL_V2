import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/entities/Answer.entity';
import { Question } from 'src/entities/Question.entity';
import { Scrap } from 'src/entities/Scrap.entity';
import { User } from 'src/entities/User.entity';
import { WordPost } from 'src/entities/WordPost.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScrapsRepository {
  constructor(
    @InjectRepository(Scrap)
    private scrapsRepository: Repository<Scrap>,
  ) {}

  async findOne(userId: number, postId: number): Promise<Scrap> {
    return await this.scrapsRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });
  }

  async findOneById(id: number): Promise<Scrap> {
    return await this.scrapsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
  }

  async findManyByUserId(userId: number): Promise<Scrap[]> {
    return await this.scrapsRepository.find({
      where: {
        user: { id: userId },
      },
      select: {
        post: {
          id: true,
          title: true,
        },
      },
      relations: {
        post: true,
      },
    });
  }

  async findManyRandomOrder(userId: number): Promise<Scrap[]> {
    return await this.scrapsRepository
      .createQueryBuilder('scrap')
      .leftJoinAndSelect('scrap.post', 'post')
      .leftJoinAndSelect('scrap.user', 'user')
      .leftJoinAndSelect('post.rightWord', 'rw')
      //.select(['scrap.id', 'rw.id', 'rw.name'])
      .where('user.id = :userId', { userId: userId })
      .orderBy('RAND()')
      .getMany();
  }

  async create(user: User, post: WordPost) {
    try {
      const newScrap = this.scrapsRepository.create({
        user: user,
        post: post,
      });
      await this.scrapsRepository.save(newScrap);
      return true;
    } catch (err) {
      console.log('CREATE SCRAP', err);
      return false;
    }
  }

  async delete(scrapId: number) {
    try {
      const deleteScrap = await this.scrapsRepository.softDelete({
        id: scrapId,
      });
      if (deleteScrap.affected) return true;
      else return false;
    } catch (err) {
      console.log('DELETE SCRAP', err);
      return false;
    }
  }
}
