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

export class UserDto {
  @ApiProperty({ example: 1, description: '유저 고유 ID' })
  id: number;

  @ApiProperty({ example: 'cool_user123', description: '사용자 ID' })
  userid: string;

  @ApiProperty({ example: '헬스킹', description: '닉네임' })
  nickname?: string;

  @ApiProperty({ example: '홍길동', description: '실명' })
  name?: string;

  @ApiProperty({
    example: 'password123!',
    description: '비밀번호',
    required: false,
  })
  password?: string;

  @ApiProperty({ example: 28, description: '나이', required: false })
  age?: string;

  @ApiProperty({ example: 'male', description: '성별', required: false })
  gender?: string;

  @ApiProperty({ example: 'user@example.com', description: '이메일' })
  email: string;

  @ApiProperty({ example: '01012345678', description: '전화번호' })
  phone?: string;

  @ApiProperty({
    example: '서울시 강남구',
    description: '주소',
    required: false,
  })
  address?: string;

  @ApiProperty({
    example: 'kakao',
    description: 'OAuth 제공자',
    required: false,
  })
  provider?: string;

  @ApiProperty({ example: 0, description: '신고당한 횟수' })
  reportCnt: number;
}
