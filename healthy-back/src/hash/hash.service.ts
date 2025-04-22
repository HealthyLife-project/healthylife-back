import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Hashtag } from '../database/entities/hash.entity';
import { Category } from '../database/entities/category.entity';
import { User } from 'src/database/entities/user.entity';
import { UserHashtag } from 'src/database/entities/hashtag.entity';
@Injectable()
export class HashService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashRepository: Repository<Hashtag>, // hashRepository 의존성 주입

    @InjectRepository(Category)
    private readonly cateRepository: Repository<Category>, // cateRepository 의존성 주입

    @InjectRepository(UserHashtag)
    private readonly userHashRepo: Repository<UserHashtag>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

  async findAllHash(
    id: number,
  ): Promise<{ result: boolean; oneHash: Hashtag[] }> {
    const oneHash = await this.hashRepository.find({
      where: { category: { id: id } }, // category 객체의 id로 쿼리
      relations: ['category'], // 'category' 관계를 포함해서 조회
    });

    return { result: oneHash !== undefined, oneHash };
  }

  async deleteHash(id: number): Promise<{ result: boolean }> {
    const res: any = await this.hashRepository.delete(id); // DeleteResult로 반환값 지정

    return { result: res.affected > 0 }; // affected 값으로 성공 여부 확인
  }

  async AllHash(): Promise<Hashtag[]> {
    const res: any = await this.hashRepository.find();

    return res;
  }

  async deleteCate(id: number): Promise<{ result: boolean }> {
    await this.hashRepository.delete({ category: { id } });
    const res: any = await this.cateRepository.delete(id); // DeleteResult로 반환값 지정

    return { result: res.affected > 0 }; // affected 값으로 성공 여부 확인
  }

  async hashtagPush(id: number, arr: any[]): Promise<{ result: boolean }> {
    for (const item of arr) {
      const hashEntity = await this.hashRepository.findOne({
        where: { hash: item.hashtag },
      });

      if (!hashEntity) continue;

      const value = this.userHashRepo.create({
        userId: id,
        hashtagId: hashEntity.id, // 수정된 부분
        category: item.category,
        hashtagName: hashEntity.hash,
      });

      await this.userHashRepo.save(value);
    }

    return { result: true };
  }

  async hashtagValidate(id: number): Promise<{ result: boolean }> {
    const user = await this.userHashRepo.findOne({ where: { userId: id } });

    return user ? { result: true } : { result: false };
  }

  async mostHashtags(): Promise<any[] | null> {
    const result = await this.userHashRepo
      .createQueryBuilder('userHashtag') //sql문을 여기서 사용하겠다 하는 함수
      .select('hashtag.id', 'hashtagId')
      .addSelect('COUNT(hashtag.id)', 'count')
      .leftJoin('userHashtag.hashtag', 'hashtag')
      .groupBy('hashtag.id') // 해시태그 id별로 그룹화
      .orderBy('count', 'DESC') // 선택 횟수 기준 내림차순 정렬
      .getRawMany();
    if (!result) {
      return null;
    }
    // 각 해시태그의 이름과 선택 횟수를 결합하여 반환
    const hashtags = await Promise.all(
      result.map(async (item) => {
        const hashtag = await this.hashRepository.findOneBy({
          id: item.hashtagId,
        });
        return {
          hashtag: hashtag?.hash,
          cnt: item.count,
        };
      }),
    );
    return hashtags;
  }

  async userSelectedHash(id: number): Promise<UserHashtag[]> {
    return await this.userHashRepo.find({ where: { userId: id } });
  }

  async userHashtagUpdate(id: number, arr: any): Promise<{ result: boolean }> {
    for (const item of arr) {
      const hashEntity = await this.hashRepository.findOne({
        where: { id: item.hashtag },
      });

      if (!hashEntity) continue;

      // 이미 userId + hashtagId 조합이 존재하는지 확인
      const existing = await this.userHashRepo.findOne({
        where: {
          userId: id,
          hashtagId: hashEntity.id,
        },
      });

      if (existing) {
        // 이미 존재하면 업데이트
        existing.category = item.category;
        existing.hashtagName = hashEntity.hash;
        await this.userHashRepo.save(existing);
      } else {
        // 존재하지 않으면 새로 생성
        const value = this.userHashRepo.create({
          userId: id,
          hashtagId: hashEntity.id,
          category: item.category,
          hashtagName: hashEntity.hash,
        });

        await this.userHashRepo.save(value);
      }
    }

    return { result: true };
  }
}
