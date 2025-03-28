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

  @Column('float')
  weight: number;

  @Column('float')
  muscleMass: number;

  @Column('float')
  bodyFat: number;

  @Column('float')
  bmi: number;

  @Column('float')
  bodyWater: number;

  @CreateDateColumn()
  createdAt: Date;
}
