import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @ManyToOne(() => Category, (category) => category.hashtags) // 외래키 설정
  parentid: Category;
}
