import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class InBody {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inbodys, { onDelete: 'CASCADE' })
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
