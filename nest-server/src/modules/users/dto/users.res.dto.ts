import { ApiProperty } from '@nestjs/swagger';

export class MypageResDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  userRank: string;

  @ApiProperty()
  userPoint: number;
}
