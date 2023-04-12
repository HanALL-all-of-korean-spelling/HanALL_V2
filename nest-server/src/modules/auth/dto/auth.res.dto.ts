import { ApiProperty } from '@nestjs/swagger';
import { Rank } from 'src/entities/enums/rank.enum';

export class LoginResDto {
  @ApiProperty()
  accesstoken: string;

  @ApiProperty()
  refreshtoken: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  isAdmin: number;

  @ApiProperty()
  userRank: Rank;

  @ApiProperty()
  userPoint: number;
}

export class AccessCheckResDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  isAdmin: number;
}

export class RefreshCheckResDto {
  @ApiProperty()
  accesstoken: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  isAdmin: number;
}
