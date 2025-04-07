import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpLog } from '../database/entities/iplog.entitiy';
import { moveCursor } from 'readline';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(IpLog)
    private ipLogRepository: Repository<IpLog>,
  ) {}

  async getLogs(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;

    const [data, total] = await this.ipLogRepository.findAndCount({
      order: { timestamp: 'DESC' }, // 최신순? 아니면 자연스럽게?
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
