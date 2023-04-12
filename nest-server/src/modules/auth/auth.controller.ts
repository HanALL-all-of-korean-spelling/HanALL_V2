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
import { AuthService } from './auth.service';
import { AccessCheck } from './decorators/userAuth.decorator';
import { LoginReqDto, UserWithToken } from './dto/auth.req.dto';
import {
  AccessCheckResDto,
  LoginResDto,
  RefreshCheckResDto,
} from './dto/auth.res.dto';
import { AccessTokenGuard } from './guards/accesstoken.guard';
import { RefreshTokenGuard } from './guards/refreshtoken.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 201, type: LoginResDto })
  @ApiResponse({ status: 400, description: '로그인 실패' })
  async login(@Body() loginReqDto: LoginReqDto) {
    return await this.authService.login(loginReqDto);
  }

  @Get('/refresh')
  @ApiOperation({ summary: 'refreshtoken 검증' })
  @ApiSecurity('refreshtokenAuth')
  @ApiResponse({ status: 200, type: RefreshCheckResDto })
  @ApiResponse({ status: 401, description: 'refreshtoken 검증 실패' })
  @UseGuards(RefreshTokenGuard)
  async checkRefreshToken(@AccessCheck() user: UserWithToken) {
    return await this.authService.checkRefreshToken(user);
  }
}
