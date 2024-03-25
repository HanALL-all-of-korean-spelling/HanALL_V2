import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ErrorCode } from 'src/entities/enums/errorCode.enum';
import { SortType } from 'src/entities/enums/sortType.enum';
import { WordType } from 'src/entities/enums/wordType.enum';
import { WordPost } from 'src/entities/WordPost.entity';
import Typesense from 'typesense';
import { wordsData } from 'words-data';
import { RightWordRepository } from '../words/repositories/rightWord.repository';
import { WrongWordRepository } from '../words/repositories/wrongWord.repository';
import { CreatePostRepoDto } from './dto/posts.repo.dto';
import { CreatePostReqDto } from './dto/posts.req.dto';
import {
  CreatePostResDto,
  GetPostListResDto,
  GetPostResDto,
} from './dto/posts.res.dto';
import { PostsRepsitory } from './posts.repository';

@Injectable()
export class PostsService {
  private tsClient: any;
  constructor(
    private postRepository: PostsRepsitory,
    private rightWordRepository: RightWordRepository,
    private wrongWordRepository: WrongWordRepository,
  ) {
    this.tsClient = new Typesense.Client({
      nodes: [
        {
          host: 'localhost',
          port: 8108,
          protocol: 'http',
        },
      ],
      apiKey: process.env.TYPESENSE_API_KEY,
    });
  }

  async createPost(
    createPostReqDto: CreatePostReqDto,
  ): Promise<CreatePostResDto | void> {
    const { title, description, helpfulInfo, rightWord, type, wrongWords } =
      createPostReqDto;

    // * 기존에 존재하는 단어인지 확인
    const rigthWordCheck = await this.rightWordRepository.findOneByName(
      rightWord,
    );
    if (rigthWordCheck) {
      throw new BadRequestException(ErrorCode.ALREADY_EXIST_POST);
    }

    // * rightWord 추가
    const savedRightWord = await this.rightWordRepository.create(
      rightWord,
      type,
    );

    // * worngWord 추가
    if (savedRightWord && wrongWords && wrongWords.length > 0) {
      for (let i = 0; i < wrongWords.length; i++) {
        await this.wrongWordRepository.create(wrongWords[i], savedRightWord.id);
      }
    }

    // * post 추가
    const createPostRepoDto: CreatePostRepoDto = {
      title,
      description,
      helpfulInfo,
      rightWordId: savedRightWord.id,
    };
    const savedPost = await this.postRepository.create(createPostRepoDto);

    if (!savedPost) {
      throw new InternalServerErrorException(ErrorCode.CREATE_POST_FAIL);
    }
    return plainToInstance(CreatePostResDto, savedPost);
  }

  async getPostList(
    type: WordType,
    sort: SortType,
    page: number,
  ): Promise<GetPostListResDto[]> {
    const postList = await this.postRepository.findMany(type, sort, page);
    return plainToInstance(GetPostListResDto, postList);
  }

  async searchPost(word: string): Promise<GetPostListResDto[]> {
    const searchParameters = {
      q: word,
      query_by: ['title', 'description', 'helpful_info'],
      sort_by: 'ratings_count:desc',
    };
    const result: GetPostListResDto[] = [];
    await this.tsClient
      .collections('words')
      .documents()
      .search(searchParameters)
      .then(async (searchResults) => {
        if (searchResults.hits) {
          searchResults.hits.forEach((o) => {
            if (o.document) {
              result.push({
                id: o.document.id,
                title: o.document.title,
                createTime: o.document.created_at,
                hitCount: o.document.hits,
                scrapCount: o.document.scraps,
                description: o.document.description,
              });
            }
          });
        }
      });
    return result;
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

  async insertWordsData() {
    console.log('length', wordsData.length);
    let num: number = 0;
    for (let word of wordsData) {
      console.log(num);
      const checkExist = await this.rightWordRepository.findOneByName(
        word.right_words,
      );
      if (!checkExist) {
        const wordType =
          word.type === 'spelling' ? WordType.spelling : WordType.spacing;
        const rightWordId = await this.rightWordRepository.create(
          word.right_words,
          wordType,
        );
        for (let wrongWord of word.wrong_words) {
          await this.wrongWordRepository.create(wrongWord, rightWordId.id);
        }
        const createPostDto: CreatePostRepoDto = {
          title: word.title,
          description: word.description,
          helpfulInfo: word.helpful_info,
          rightWordId: rightWordId.id,
        };
        await this.postRepository.create(createPostDto);
      } else {
        console.log('중복 - ', word.right_words);
      }
      num++;
    }
    return true;
  }
}
