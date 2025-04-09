import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class PetChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userid: number;

  @Column({})
  roomid: number;

  @CreateDateColumn()
  createdAt: Date;
}
