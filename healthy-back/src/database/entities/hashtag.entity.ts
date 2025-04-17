import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Hashtag } from './hash.entity';
@Entity()
export class UserHashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.hashtags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  hashtagId: number;

  @ManyToOne(() => Hashtag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hashtagId' })
  hashtag: Hashtag;

  @Column({ nullable: true })
  category: string;
}
