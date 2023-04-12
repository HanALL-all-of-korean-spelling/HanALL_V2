import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/entities/User.entity';
import { AccessCheck } from '../auth/decorators/userAuth.decorator';
import { AccessTokenGuard } from '../auth/guards/accesstoken.guard';
import { CreateQuestionDto } from './dto/questions.req.dto';
import { QuestionsResDto } from './dto/questions.res.dto';
import { QuestionsService } from './questions.service';

@ApiTags('Question')
@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post('/')
  @ApiOperation({ summary: '문의글 작성' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 503, description: '문의글 작성 실패' })
  @UseGuards(AccessTokenGuard)
  async createQuestion(
    @AccessCheck() user: User,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return await this.questionsService.createQuestion(user, createQuestionDto);
  }

  @Get('/')
  @ApiOperation({ summary: '문의글 조회' })
  @ApiResponse({ status: 200, type: [QuestionsResDto] })
  @ApiResponse({ status: 503, description: '문의글 조회 실패' })
  async getQuestion(@Query('page', ParseIntPipe) page: number) {
    return await this.questionsService.getQuestion(page);
  }

  @Patch('/:questionId')
  @ApiOperation({ summary: '문의글 수정' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 403, description: '접근 권한 오류' })
  @ApiResponse({ status: 503, description: '문의글 수정 실패' })
  @UseGuards(AccessTokenGuard)
  async modifyQuestion(
    @AccessCheck() user: User,
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return await this.questionsService.modifyQuestion(
      questionId,
      user,
      createQuestionDto,
    );
  }

  @Delete('/:questionId')
  @ApiOperation({ summary: '문의글 삭제' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 403, description: '접근 권한 오류' })
  @ApiResponse({ status: 503, description: '문의글 삭제 실패' })
  @UseGuards(AccessTokenGuard)
  async deleteQuestion(
    @AccessCheck() user: User,
    @Param('questionId', ParseIntPipe) questionId: number,
  ) {
    return await this.questionsService.deleteQuestion(questionId, user);
  }
}
