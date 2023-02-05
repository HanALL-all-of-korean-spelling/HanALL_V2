import { ApiProperty } from '@nestjs/swagger';

export class JoinReqDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  passwd: string;

  @ApiProperty()
  nickname: string;
}
