// src/seeder/seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';
import { Hashtag } from '../database/entities/hash.entity';
import { Adb } from '../database/entities/ad.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Hashtag) private hashtagRepo: Repository<Hashtag>,
    @InjectRepository(Adb) private adbRepo: Repository<Adb>,
  ) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async runSeed() {
    // 🧑 User seed
    const password = await this.hashPassword('#Aa1234567');
    const user = this.userRepo.create({
      userid: 'testuser',
      nickname: '헬린이',
      name: '안상현',
      password: password,
      age: '30',
      gender: 'male',
      email: 'test@example.com',
      phone: '01012345678',
    });
    await this.userRepo.save(user);

    // 📂 Category seed
    const categories = [
      { id: 6, category: '운동' },
      { id: 7, category: '헬스' },
      { id: 9, category: '피트니스' },
    ];
    await this.categoryRepo.save(categories);

    // 🔖 Hashtag seed
    const hashtags: [string, number][] = [
      ['축구', 6],
      ['농구', 6],
      ['배구', 6],
      ['피구', 6],
      ['수영', 6],
      ['요가', 7],
      ['헬린이', 7],
      ['헬창', 7],
      ['웨이트', 7],
      ['홈트', 7],
      ['다이어트', 7],
      ['맨몸운동', 7],
      ['운동기록', 9],
      ['파크워크아웃', 9],
      ['아웃도어', 9],
      ['공원', 9],
      ['러닝', 9],
      ['하이킹', 9],
      ['반려견과 산책', 9],
      ['펫워크아웃', 9],
    ];
    await this.hashtagRepo.save(
      hashtags.map(([hash, categoryid]) => ({
        hash,
        categoryid,
      })),
    );

    // 📸 Adb seed
    const adImages = [
      'ad-1745406725786-528540682.png',
      'ad-1745406731084-202442315.png',
      'ad-1745406735669-980420030.png',
      'ad-1745406740131-450505105.jpg',
    ];

    await this.adbRepo.save(
      adImages.map((file) => ({
        imgsrc: `ads/${file}`,
      })),
    );
  }
}
