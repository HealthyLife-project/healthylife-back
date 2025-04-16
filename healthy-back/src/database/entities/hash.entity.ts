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

  @ManyToOne(() => Category, (category) => category.hashtags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryid' })
  category: Category;

  @Column()
  categoryid: number;
}
