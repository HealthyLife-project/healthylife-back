// src/middle/logging.ip.middle.ts
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
    const clientIp = req.headers['x-forwarded-for'] || req.ip;
    const log = new IpLog();
    log.ipAddress = clientIp as string;
    log.url = req.originalUrl;

    await this.ipLogRepository.save(log); // 로그를 DB에 저장

    next();
  }
}
