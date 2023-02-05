import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JoinReqDto } from './dto/users.req.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  async join(joinReqDto: JoinReqDto): Promise<boolean> {
    const emailCheck = await this.usersRepository.findOneByEmail(
      joinReqDto.email,
    );
    if (emailCheck) {
      throw new BadRequestException('이미 가입한 이메일입니다.');
    }
    const nicknameCheck = await this.usersRepository.findOneByNickname(
      joinReqDto.nickname,
    );
    if (nicknameCheck) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다.');
    }
    const hashedPwd: string = await bcrypt.hash(joinReqDto.passwd, 10);
    joinReqDto.passwd = hashedPwd;

    const createUser = await this.usersRepository.create(joinReqDto);
    if (!createUser) {
      throw new InternalServerErrorException('회원가입에 실패했습니다.');
    }
    return createUser;
  }
}
