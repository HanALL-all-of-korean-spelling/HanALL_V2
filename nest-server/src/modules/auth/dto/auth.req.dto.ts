import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { User } from 'src/entities/User.entity';

export class LoginReqDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  passwd: string;
}

export class UserWithToken extends User {
  accesstoken: string;
}
