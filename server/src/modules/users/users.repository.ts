import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { JoinReqDto } from './dto/users.req.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async findOneByNickname(nickname: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ nickname });
    return user;
  }

  async findOneByEmailPwd(email: string, passwd: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
        passwd: passwd,
      },
    });
    return user;
  }

  async create(joinReqDto: JoinReqDto) {
    try {
      const { email, passwd, nickname } = joinReqDto;
      const newUser = this.usersRepository.create({
        email: email,
        passwd: passwd,
        nickname: nickname,
        isAdmin: false,
      });
      await this.usersRepository.save(newUser);
      return true;
    } catch (err) {
      console.log('CREATE USER', err);
      return false;
    }
  }

  async updatePoint(user: User, point: number): Promise<User> {
    user.userPoint += point;
    if (user.userPoint > 20) user.userRank = 2;
    if (user.userPoint > 40) user.userRank = 3;
    if (user.userPoint > 60) user.userRank = 4;
    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }
}
