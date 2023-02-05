import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
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
}
