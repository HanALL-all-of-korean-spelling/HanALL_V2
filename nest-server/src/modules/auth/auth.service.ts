import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { LoginReqDto, UserWithToken } from './dto/auth.req.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async checkAccessToken(user: User) {
    const userEmail = this.maskingEmail(user.email);
    const userData = {
      email: userEmail,
      nickname: user.nickname,
      rank: user.userRank,
      point: user.userPoint,
      isAdmin: user.isAdmin,
    };
    return userData;
  }

  async checkRefreshToken(user: UserWithToken) {
    const userEmail = this.maskingEmail(user.email);
    const userData = {
      accesstoken: user.accesstoken,
      email: userEmail,
      nickname: user.nickname,
      rank: user.userRank,
      point: user.userPoint,
      isAdmin: user.isAdmin,
    };
    return userData;
  }

  async login(loginReqDto: LoginReqDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: loginReqDto.email,
        passwd: loginReqDto.passwd,
      },
    });
    if (!user)
      throw new BadRequestException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    const userEmail = this.maskingEmail(user.email);
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
      email: userEmail,
      nickname: user.nickname,
      rank: user.userRank,
      point: user.userPoint,
      isAdmin: user.isAdmin,
    };
    return userData;
  }

  maskingEmail(email: string) {
    const strLength = email.split('@')[0].length - 3;
    const userEmail = email.replace(
      new RegExp('.(?=.{0,' + strLength + '}@)', 'g'),
      '*',
    );
    return userEmail;
  }
}
