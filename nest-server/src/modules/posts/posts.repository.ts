import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortType } from 'src/entities/enums/sortType.enum';
import { WordType } from 'src/entities/enums/wordType.enum';
import { WordPost } from 'src/entities/WordPost.entity';
import { RightWord } from 'src/entities/RightWord.entity';
import { Repository } from 'typeorm';
import { RightWordRepository } from '../words/repositories/rightWord.repository';
import { CreatePostDbDto } from './dto/posts.db.dto';
import { CreatePostReqDto } from './dto/posts.req.dto';
import { GetPostListResDto } from './dto/posts.res.dto';
import { WrongWordRepository } from '../words/repositories/wrongWord.repository';

@Injectable()
export class PostsRepsitory {
  constructor(
    @InjectRepository(WordPost)
    private postsRepository: Repository<WordPost>,
    private rightWordRepository: RightWordRepository,
    private wrongWordRepository: WrongWordRepository,
  ) {}

  async findMany(
    type: WordType,
    sort: SortType,
    page: number,
  ): Promise<GetPostListResDto[]> {
    let query = this.postsRepository
      .createQueryBuilder('post')
      .innerJoin('post.rightWord', 'rw')
      .select([
        'post.id',
        'post.title',
        'post.createTime',
        'post.hitCount',
        'post.scrapCount',
      ])
      .where('rw.type = :type', { type: type })
      .skip((page - 1) * 10)
      .take(10);

    if (sort === SortType.createdAt) query.orderBy('post.createTime', 'DESC');
    if (sort === SortType.hits) query.orderBy('post.hitCount', 'DESC');
    if (sort === SortType.scraps) query.orderBy('post.scrapCount', 'DESC');

    return query.getMany();
  }

  async findOneById(id: number): Promise<WordPost> {
    let post: any = await this.postsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['rightWord'],
      select: {
        rightWord: {
          name: true,
          type: true,
        },
      },
    });
    if (!post) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }
    const wrongWords = await this.wrongWordRepository.findManyByRightWordId(
      post.rightWord.id,
    );
    post.wrongWords = wrongWords;

    // * 게시글 조회수 증가
    let hitCount: number = Number(post.hitCount) + 1;
    await this.postsRepository.update(
      {
        id: post.id,
      },
      {
        hitCount: hitCount,
      },
    );

    return post;
  }

  async findOneByRanDom(date: number): Promise<WordPost> {
    const post = await this.postsRepository
      .createQueryBuilder('posts')
      .innerJoinAndSelect('posts.rightWord', 'rightWord')
      .orderBy(`RAND(${date})`)
      .getOne();
    return post;
  }

  async create(createPostDbDto: CreatePostDbDto) {
    try {
      const { title, description, helpfulInfo, rightWordId } = createPostDbDto;
      const rightWord = await this.rightWordRepository.findOneById(rightWordId);
      const newPost = this.postsRepository.create({
        title: title,
        description: description,
        helpfulInfo: helpfulInfo,
        rightWord: rightWord,
      });
      const newPostId = await this.postsRepository.save(newPost);
      return newPostId;
    } catch (err) {
      console.log('CREATE POST', err);
      return false;
    }
  }
}
