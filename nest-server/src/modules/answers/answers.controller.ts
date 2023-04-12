import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Answer } from 'src/entities/Answer.entity';
import { User } from 'src/entities/User.entity';
import { AccessCheck } from '../auth/decorators/userAuth.decorator';
import { AccessTokenGuard } from '../auth/guards/accesstoken.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AnswersService } from './answers.service';
import { CreateAnswerDto, UpdateAnswerDto } from './dto/answers.req.dto';
import { AnswerResDto } from './dto/answers.res.dto';

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

  @Get('/:id')
  @ApiOperation({ summary: '답변 조회' })
  @ApiResponse({ status: 200, type: AnswerResDto })
  async getAnswer(@Param('id', ParseIntPipe) id: number) {
    return await this.answersService.getAnswer(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: '답변 수정' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 503, description: '답변 수정 실패' })
  @UseGuards(AdminGuard)
  async modifyAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return await this.answersService.modifyAnswer(id, updateAnswerDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: '답변 삭제' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 503, description: '답변 삭제 실패' })
  @UseGuards(AdminGuard)
  async deleteAnswer(@Param('id', ParseIntPipe) id: number) {
    return await this.answersService.deleteAnswer(id);
  }
}
