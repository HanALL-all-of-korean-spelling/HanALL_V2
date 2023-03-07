import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/entities/User.entity';
import { AccessCheck } from '../auth/decorators/userAuth.decorator';
import { AccessTokenGuard } from '../auth/guards/accesstoken.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/answers.req.dto';

@ApiTags('Answer')
@Controller('answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  @Post('/')
  @ApiOperation({ summary: '답변 작성' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 503, description: '답변 작성 실패' })
  @UseGuards(AdminGuard)
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return await this.answersService.createAnswer(createAnswerDto);
  }
}
