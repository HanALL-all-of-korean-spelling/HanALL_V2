import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/entities/User.entity';
import { AccessCheck } from '../auth/decorators/userAuth.decorator';
import { JoinReqDto } from './dto/users.req.dto';
import { AccessTokenGuard } from '../auth/guards/accesstoken.guard';
import { RefreshTokenGuard } from '../auth/guards/refreshtoken.guard';
import { UsersService } from './users.service';
import { MypageResDto } from './dto/users.res.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 400, description: '이메일/닉네임 중복' })
  @ApiResponse({ status: 503, description: '회원가입 실패' })
  async join(@Body() joinReqDto: JoinReqDto) {
    const userData = await this.usersService.join(joinReqDto);
    return userData;
  }

  @Get('/:userId')
  @ApiOperation({ summary: '회원 정보 확인' })
  @ApiSecurity('accesstokenAuth')
  @ApiResponse({ status: 200, type: MypageResDto })
  @ApiResponse({ status: 401, description: 'accesstoken 검증 실패' })
  @ApiResponse({ status: 403, description: '접근 권한 없음' })
  @UseGuards(AccessTokenGuard)
  async mypage(
    @AccessCheck() user: User,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const userData = await this.usersService.mypage(user, userId);
    return userData;
  }
}
