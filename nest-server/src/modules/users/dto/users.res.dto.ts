import { ApiProperty } from '@nestjs/swagger';
import { Rank } from 'src/entities/enums/rank.enum';

export class MypageResDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  userRank: Rank;

  @ApiProperty()
  userPoint: number;

  @ApiProperty()
  isAdmin: boolean;
}
