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
