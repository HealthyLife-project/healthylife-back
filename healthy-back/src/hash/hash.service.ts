import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from '../database/entities/hash.entity';
import { Category } from '../database/entities/category.entity';

@Injectable()
export class HashService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashRepository: Repository<Hashtag>, // hashRepository 의존성 주입

    @InjectRepository(Category)
    private readonly cateRepository: Repository<Category>, // cateRepository 의존성 주입
  ) {}

  // Category 모두 조회
  async findAllCate(): Promise<Category[]> {
    return this.cateRepository.find();
  }

  async createCategory(category: string): Promise<Category> {
    const newCategory = this.cateRepository.create({ category }); // 엔터티 생성
    return this.cateRepository.save(newCategory); // DB에 저장
  }
}
