import { ApiProperty } from '@nestjs/swagger';

export class CreateHashtagDto {
  @ApiProperty({
    description: '해시태그명',
    type: String,
  })
  hashtag: string;

  @ApiProperty({
    description: '카테고리 ID',
    type: Number,
  })
  categoryId: number;
}

export class CreateCategoryDto {
  @ApiProperty({
    description: '카테고리명',
    type: String,
  })
  category: String;
}
