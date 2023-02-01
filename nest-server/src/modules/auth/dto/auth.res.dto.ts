import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty()
  accesstoken: string;

  @ApiProperty()
  refreshtoken: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  rank: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
  isAdmin: number;
}

export class AccessCheckResDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  rank: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
  isAdmin: number;
}

export class RefreshCheckResDto {
  @ApiProperty()
  accesstoken: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  rank: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
  isAdmin: number;
}
