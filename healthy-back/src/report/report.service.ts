import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Report } from 'src/database/entities/report.entity';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly ReportRepository: Repository<Report>,
  ) {}

  async create(reportData: Partial<Report>) {
    await this.ReportRepository.create(reportData);

    return this.ReportRepository.save(reportData);
  }

  async reportGet(): Promise<Report[]> {
    const report = await this.ReportRepository.find();

    return report;
  }
}
