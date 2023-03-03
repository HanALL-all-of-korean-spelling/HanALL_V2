import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { maskingEmail } from 'src/utils/maskingModule';
import { Repository } from 'typeorm';
import { UsersRepository } from '../users/users.repository';
import { LoginReqDto, UserWithToken } from './dto/auth.req.dto';
import * as bcrypt from 'bcrypt';

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

  async login(loginReqDto: LoginReqDto) {
    const { email, passwd } = loginReqDto;
    const user = await this.usersRepository.findOneByEmail(email);
    const pwdCheck = await bcrypt.compare(passwd, user.passwd);
    if (!pwdCheck)
      throw new BadRequestException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    const userEmail = maskingEmail(user.email);
    const accesstoken: string = this.jwtService.sign(
      { userId: user.id },
      {
        secret: this.configService.get('JWT_ACCESS_KEY'),
        algorithm: 'HS256',
        expiresIn: '1h',
      },
    );
    const refreshtoken: string = this.jwtService.sign(
      { userId: user.id },
      {
        secret: this.configService.get('JWT_REFRESH_KEY'),
        algorithm: 'HS256',
        expiresIn: '7d',
      },
    );
    const userData = {
      accesstoken: accesstoken,
      refreshtoken: refreshtoken,
      userId: user.id,
      email: userEmail,
      nickname: user.nickname,
      isAdmin: Boolean(user.isAdmin),
    };
    return userData;
  }
}
