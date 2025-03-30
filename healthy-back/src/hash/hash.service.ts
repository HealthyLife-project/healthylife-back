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
    const newCategory = this.cateRepository.create({ category }); // 엔티티 생성
    return this.cateRepository.save(newCategory); // DB에 저장
  }

  async createHashtag(hash: string, categoryId: number): Promise<Hashtag> {
    // categoryId로 카테고리 객체를 가져오기
    const category = await this.cateRepository.findOne({
      where: { id: categoryId }, // 조건으로 categoryId를 전달
    }); // categoryId로 카테고리 객체를 찾음
    if (!category) {
      throw new Error('카테고리가 없어요');
    }
    // Hashtag 엔티티 생성 시, category  연결
    const newHashtag = this.hashRepository.create({
      hash,
      category, // 외래키로 Category 객체를 연결
    });

    // DB에 저장
    return this.hashRepository.save(newHashtag);
  }
}
