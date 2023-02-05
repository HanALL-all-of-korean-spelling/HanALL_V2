import {
  Body,
  Controller,
  Get,
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
}
