import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdService } from './ad.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAdDto } from 'src/database/entities/dto/addto';

@ApiTags('광고')
@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post('upload')
  @ApiOperation({
    summary: '광고 이미지 업로드',
    description: '광고 이미지를 업로드하고 DB에 저장.',
  })
  @ApiResponse({ status: 201, description: '업로드 및 DB 저장 성공' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/ads',
        filename: (req, file, callback) => {
          const randomSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9); //랜덤 변수 생성
          const ext = extname(file.originalname); //이미지 파일 이름
          callback(null, `ad-${randomSuffix}${ext}`); //콜백 ad-날짜 포함된 랜덤 숫자와 ext(파일 오리진 네임) 으로 된 파일 업로드
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('이미지 파일만 허용됩니다.'), false); //callback은 그냥 return시킴 catch(error)에서 error가 이 메세지
        }
        callback(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, //이미지 사이즈 나중에 변경해야됨
    }),
  )
  async uploadAdImage(@UploadedFile() file: Express.Multer.File) {
    //위 함수를 토대로 이미지 세이브
    const imgPath = `/uploads/ads/${file.filename}`;
    const saved = await this.adService.saveAdImage(imgPath);

    return {
      message: '파일 업로드 성공',
      id: saved.id,
      path: saved.imgsrc, //return값
    };
  }

  @Get('getAd')
  @ApiOperation({
    summary: '광고 이미지 목록 조회',
  })
  @ApiResponse({
    status: 200,
    description: '광고 이미지 목록',
    type: CreateAdDto,
    isArray: true, // 여러 개일 경우
  })
  async getAd(): Promise<CreateAdDto[]> {
    return this.adService.adGet();
  }
}
