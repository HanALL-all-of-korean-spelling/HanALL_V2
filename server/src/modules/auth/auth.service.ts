import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User.entity';
import { maskingEmail } from 'src/utils/maskingModule';
import { UsersRepository } from '../users/users.repository';
import { LoginReqDto, UserWithToken } from './dto/auth.req.dto';
import { LoginResDto } from './dto/auth.res.dto';
import { rankConvert } from 'src/utils/rankConvertModule';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async checkAccessToken(user: User) {
    const userEmail = maskingEmail(user.email);
    const userData = {
      userId: user.id,
      email: userEmail,
      nickname: user.nickname,
      isAdmin: user.isAdmin,
    };
    return userData;
  }

  async checkRefreshToken(user: UserWithToken) {
    const userEmail = maskingEmail(user.email);
    const userData = {
      accesstoken: user.accesstoken,
      userId: user.id,
      email: userEmail,
      nickname: user.nickname,
      isAdmin: Boolean(user.isAdmin),
    };
    return userData;
  }

  async login(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    const { email, passwd } = loginReqDto;
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }
    const pwdCheck = await bcrypt.compare(passwd, user.passwd);
    if (!pwdCheck) {
      throw new BadRequestException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }
    const userEmail = maskingEmail(user.email);
    const { accesstoken, refreshtoken } = this.createToken(user.id);

    const userData: LoginResDto = {
      accesstoken: accesstoken,
      refreshtoken: refreshtoken,
      userId: user.id,
      email: userEmail,
      nickname: user.nickname,
      isAdmin: Boolean(user.isAdmin),
      userRank: rankConvert(user.userRank),
      userPoint: user.userPoint,
    };
    return userData;
  }

  private createToken(userId: number) {
    const accesstoken: string = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get('JWT_ACCESS_KEY'),
        algorithm: 'HS256',
        expiresIn: '1h',
      },
    );
    const refreshtoken: string = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get('JWT_REFRESH_KEY'),
        algorithm: 'HS256',
        expiresIn: '7d',
      },
    );

    return { accesstoken, refreshtoken };
  }
}
