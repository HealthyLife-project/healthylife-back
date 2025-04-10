import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @ManyToOne(() => Category, (category) => category.hashtags) // 외래키 설정
  @JoinColumn({ name: 'categoryid' }) // 외래키 컬럼명을 categoryid로 설정
  @Column()
  categoryid: number;

  category: Category;
}
