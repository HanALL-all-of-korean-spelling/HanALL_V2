import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SortType } from 'src/entities/enums/sortType.enum';
import { WordType } from 'src/entities/enums/wordType.enum';
import { WordPost } from 'src/entities/WordPost.entity';
import { RightWordRepository } from '../words/repositories/rightWord.repository';
import { WrongWordRepository } from '../words/repositories/wrongWord.repository';
import { CreatePostReqDto } from './dto/posts.req.dto';
import { GetPostListResDto, GetPostResDto } from './dto/posts.res.dto';
import { PostsRepsitory } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private postRepository: PostsRepsitory,
    private rightWordRepository: RightWordRepository,
    private wrongWordRepository: WrongWordRepository,
  ) {}

  async createPost(createPostReqDto: CreatePostReqDto) {
    const { title, description, helpfulInfo, rightWord, type, wrongWords } =
      createPostReqDto;
    const rigthWordCheck = await this.rightWordRepository.findOneByName(
      rightWord,
    );
    if (rigthWordCheck) {
      throw new BadRequestException('이미 게시된 내역이 있는 맞춤법입니다.');
    }
    const creteRightWord: number = await this.rightWordRepository.create(
      rightWord,
      type,
    );
    if (creteRightWord) {
      const rightWordId: number = creteRightWord;
      for (let i = 0; i < wrongWords.length; i++) {
        await this.wrongWordRepository.create(wrongWords[i], rightWordId);
        const createPostDbDto = {
          title,
          description,
          helpfulInfo,
          rightWordId,
        };
        const createdPost = await this.postRepository.create(createPostDbDto);
        return createdPost;
      }
    } else {
      throw new InternalServerErrorException('게시글 작성에 실패했습니다.');
    }
  }

  async getPostList(
    type: WordType,
    sort: SortType,
    page: number,
  ): Promise<GetPostListResDto[]> {
    return await this.postRepository.findMany(type, sort, page);
  }

  async getPost(postId: number): Promise<WordPost> {
    let postData: any = await this.postRepository.findOneById(postId);
    postData.type = postData.rightWord.type;
    postData.rightWord = { name: postData.rightWord.name };
    return postData;
  }

  async getRandomPost() {
    const today: number = new Date().getDate();
    return await this.postRepository.findOneByRanDom(today);
  }
}
