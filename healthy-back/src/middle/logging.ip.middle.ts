import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpLog } from '../database/entities/iplog.entitiy';

@Injectable()
export class IpMiddle implements NestMiddleware {
  constructor(
    @InjectRepository(IpLog)
    private ipLogRepository: Repository<IpLog>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    // 'x-forwarded-for' 헤더는 여러 개의 IP를 포함
    const clientIp = req.headers['x-forwarded-for']
      ? typeof req.headers['x-forwarded-for'] === 'string'
        ? req.headers['x-forwarded-for'].split(',')[0].trim()
        : 'unknown'
      : req.ip;

    // IP가 string 타입이 아니거나 빈 값일 경우 'unknown'으로 처리
    const ipAddress =
      typeof clientIp === 'string' ? clientIp.split('?')[0] : 'unknown';

    const log = new IpLog();
    log.ipAddress = ipAddress;
    log.url = req.originalUrl.split('?')[0];

    // 로그를 DB에 저장
    await this.ipLogRepository.save(log);

    next();
  }
}
