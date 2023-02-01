import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accesstoken',
) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    const cookieExtractor = (req: Request) => {
      const { accesstoken } = req.cookies;
      return accesstoken;
    };
    super({
      secretOrKey: process.env.JWT_ACCESS_KEY,
      jwtFromRequest: cookieExtractor,
    });
  }
  async validate(payload) {
    const { id } = payload;
    const user: User = await this.usersRepository.findOneBy({ id });
    return user;
  }
}
