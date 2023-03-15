import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JoinReqDto, UpdatePointReqDto } from './dto/users.req.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/User.entity';
import { AuthService } from '../auth/auth.service';
import { maskingEmail } from 'src/utils/maskingModule';
import { MypageResDto } from './dto/users.res.dto';
import { rankConvert } from 'src/utils/rankConvertModule';
import { Rank } from 'src/entities/enums/rank.enum';

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

  async mypage(user: User): Promise<MypageResDto> {
    const userEmail = maskingEmail(user.email);
    const rank: Rank = rankConvert(user.userRank);
    const userData = {
      email: userEmail,
      nickname: user.nickname,
      userRank: rank,
      userPoint: user.userPoint,
    };
    return userData;
  }

  async updatePoint(
    user: User,
    updatePointReqDto: UpdatePointReqDto,
  ): Promise<MypageResDto> {
    const { plusPoint } = updatePointReqDto;
    const { email, nickname, userPoint, userRank } =
      await this.usersRepository.updatePoint(user, plusPoint);
    const rank: Rank = rankConvert(userRank);
    const userData: MypageResDto = {
      email: email,
      nickname: nickname,
      userRank: rank,
      userPoint: userPoint,
    };
    return userData;
  }
}
