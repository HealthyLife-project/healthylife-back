import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserHashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.hashtags, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  hashtag: string;

  @Column({ nullable: true })
  category: string;
}
