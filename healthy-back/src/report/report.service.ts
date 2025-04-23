import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Report } from 'src/database/entities/report.entity';
import { User } from 'src/database/entities/user.entity';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly ReportRepository: Repository<Report>,
    @InjectRepository(User)
    private readonly UserR: Repository<User>,
  ) {}

  async create(reportData: Partial<any>) {
    const USER = await this.UserR.findOne({ where: { id: reportData.userId } });
    const Target = await this.UserR.findOne({
      where: { id: reportData.reporterId },
    });
    if (!USER || !Target) {
      return 'server ERROR';
    }
    const reportd = { report: reportData.report, user: USER, reporter: Target };
    const data = await this.ReportRepository.create(reportd);
    return this.ReportRepository.save(data);
  }

  async reportGet(): Promise<Report[]> {
    const reports = await this.ReportRepository.find({
      relations: ['user', 'reporter'],
    });
    return reports;
  }
}
