import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PetChatRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  userid: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true, default: 1 })
  cnt: number;
  @CreateDateColumn()
  createdAt: Date;
}
