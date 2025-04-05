import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: '아이디',
    type: String,
  })
  userid: string;

  @ApiProperty({
    description: '비밀번호',
    type: String,
  })
  password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    description: '유저id',
    type: Number,
  })
  userid: number; // 또는 string, 실제 DB 타입에 맞게

  @ApiProperty({
    description: '비밀번호',
    type: String,
  })
  password: string;
  @ApiProperty({
    description: '비밀번호 확인',
    type: String,
  })
  passwordCheck: string;
}
