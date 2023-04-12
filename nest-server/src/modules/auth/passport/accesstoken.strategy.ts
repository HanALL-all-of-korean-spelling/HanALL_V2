import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accesstoken',
) {
  constructor(private usersRepository: UsersRepository) {
    const cookieExtractor = (req: Request) => {
      const accesstoken = req.headers['accesstoken'];
      return accesstoken;
    };
    super({
      secretOrKey: process.env.JWT_ACCESS_KEY,
      jwtFromRequest: cookieExtractor,
    });
  }
  async validate(payload) {
    const { userId } = payload;
    const user: User = await this.usersRepository.findOneById(userId);
    return user;
  }
}
