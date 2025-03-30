import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpLog } from '../database/entities/iplog.entitiy';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(IpLog)
    private ipLogRepository: Repository<IpLog>,
  ) {}

  async getAllLogs(): Promise<IpLog[]> {
    return this.ipLogRepository.find(); // 모든 로그를 조회
  }
}
