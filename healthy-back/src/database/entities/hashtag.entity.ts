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

  @Column() // <- userId를 명시적으로 선언
  userId: number;

  @ManyToOne(() => User, (user) => user.hashtags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Hashtag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hashtagId' })
  hashtag: Hashtag;

  @Column({ nullable: true })
  category: string;
}
