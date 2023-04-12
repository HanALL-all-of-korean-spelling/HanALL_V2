import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class JoinReqDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  passwd: string;

  @ApiProperty()
  @IsString()
  nickname: string;
}

export class UpdatePointReqDto {
  @ApiProperty()
  @IsNumber()
  plusPoint: number;
}
