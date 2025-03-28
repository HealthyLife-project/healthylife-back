import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserHashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.hashtags, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  hashtag: string;

  @Column()
  category: string;
}
