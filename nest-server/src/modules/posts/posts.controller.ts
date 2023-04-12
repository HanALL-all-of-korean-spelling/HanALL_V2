import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SortType } from 'src/entities/enums/sortType.enum';
import { WordType } from 'src/entities/enums/wordType.enum';
import { WordPost } from 'src/entities/WordPost.entity';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreatePostReqDto } from './dto/posts.req.dto';
import { GetPostListResDto, GetPostResDto } from './dto/posts.res.dto';
import { PostsService } from './posts.service';

@ApiTags('Post')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/')
  @ApiOperation({ summary: '맞춤법 정보 게시글 작성' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, description: '이메일/닉네임 중복' })
  @ApiResponse({ status: 503, description: '회원가입 실패' })
  @UseGuards(AdminGuard)
  async createPost(@Body() createPostReqDto: CreatePostReqDto) {
    const userData = await this.postsService.createPost(createPostReqDto);
    return userData;
  }

  @Get('/')
  @ApiOperation({ summary: '맞춤법 게시글 목록 조회' })
  @ApiResponse({ status: 200, type: [GetPostListResDto] })
  @ApiResponse({ status: 400, description: '이메일/닉네임 중복' })
  @ApiResponse({ status: 503, description: '회원가입 실패' })
  @ApiQuery({ name: 'type', enum: WordType })
  @ApiQuery({ name: 'sort', enum: SortType })
  async getPostList(
    @Query('type') type: WordType,
    @Query('sort', new ParseEnumPipe(SortType)) sort: SortType,
    @Query('page', ParseIntPipe) page: number,
  ) {
    const postsData = await this.postsService.getPostList(type, sort, page);
    return postsData;
  }

  @Get('/today')
  @ApiOperation({ summary: '오늘의 맞춤법 조회' })
  @ApiResponse({ status: 200, type: GetPostResDto })
  async getRandomPost() {
    const postsData = await this.postsService.getRandomPost();
    return postsData;
  }

  @Get('/:postId')
  @ApiOperation({ summary: '맞춤법 게시글 조회' })
  @ApiResponse({ status: 200, type: GetPostResDto })
  @ApiResponse({ status: 400, description: '이메일/닉네임 중복' })
  @ApiResponse({ status: 503, description: '회원가입 실패' })
  async getPost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postsService.getPost(postId);
  }
}
