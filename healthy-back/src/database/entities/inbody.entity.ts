import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class InBody {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // 👈 이게 현재 테이블에 생기는 FK 컬럼

  @ManyToOne(() => User, (user) => user.inbodys, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  muscleMass: string;

  @Column({ nullable: true })
  bodyFat: string;

  @Column({ nullable: true })
  bmi: string;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  bodyFatPer: string;
  @CreateDateColumn()
  createdAt: Date;
}
