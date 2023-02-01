import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refreshtoken',
) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const cookieExtractor = (req: Request) => {
      const { refreshtoken } = req.cookies;
      return refreshtoken;
    };
    super({
      secretOrKey: process.env.JWT_REFRESH_KEY,
      jwtFromRequest: cookieExtractor,
    });
  }

  async validate(payload) {
    const { id } = payload;
    let user: any = await this.usersRepository.findOneBy({ id });
    const accessToken: string = this.jwtService.sign(
      { id },
      {
        secret: this.configService.get('JWT_ACCESS_KEY'),
        algorithm: 'HS256',
        expiresIn: '1h',
      },
    );
    user.accesstoken = accessToken;
    return user;
  }
}
