import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  report: string;

  @Column({ default: 0 })
  reportCnt: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  // 신고당한 사람
  @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
  user: User;

  // 신고한 사람
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  reporter: User; // 신고자 (이 사람은 게시글을 신고한 사람)
}
