import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
