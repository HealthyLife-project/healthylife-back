import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adb } from '../../database/entities/ad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Adb)
    private readonly adRepository: Repository<Adb>,
  ) {}

  async saveAdImage(imgsrc: string): Promise<Adb> {
    const ad = this.adRepository.create({ imgsrc });
    return this.adRepository.save(ad);
  }

  async adGet(): Promise<Adb[]> {
    return this.adRepository.find();
  }
}
