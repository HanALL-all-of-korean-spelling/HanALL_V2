import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/entities/User.entity';
import { AccessCheck } from '../auth/decorators/userAuth.decorator';
import { AccessTokenGuard } from '../auth/guards/accesstoken.guard';
import { GetScrapListResDto } from './dto/scraps.res.dto';
import { ScrapsService } from './scraps.service';

@ApiTags('Scrap')
@Controller('scraps')
export class ScrapsController {
  constructor(private scrapsService: ScrapsService) {}

  @Get('/')
  @ApiOperation({ summary: '보관함 조회' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: GetScrapListResDto })
  @UseGuards(AccessTokenGuard)
  async getScrapList(@AccessCheck() user: User) {
    return await this.scrapsService.getScrapList(user);
  }

  @Post('/:postId')
  @ApiOperation({ summary: '보관하기' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 503, description: '보관하기 실패' })
  @UseGuards(AccessTokenGuard)
  async createScrap(
    @AccessCheck() user: User,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return await this.scrapsService.createScrap(user, postId);
  }

  @Delete('/:scrapId')
  @ApiOperation({ summary: '보관글 삭제' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 503, description: '보관글 삭제 실패' })
  @UseGuards(AccessTokenGuard)
  async deleteScrap(
    @AccessCheck() user: User,
    @Param('scrapId', ParseIntPipe) scrapId: number,
  ) {
    return await this.scrapsService.deleteScrap(user, scrapId);
  }

  @Get('/test')
  @ApiOperation({ summary: '학습하기 리스트 조회' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: GetScrapListResDto })
  @UseGuards(AccessTokenGuard)
  async getTestList(@AccessCheck() user: User) {
    return await this.scrapsService.getTestList(user);
  }
}
