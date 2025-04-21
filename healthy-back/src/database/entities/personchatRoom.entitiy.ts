import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class PersonChatRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  userid: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true, default: 0 })
  cnt: number;
  @CreateDateColumn()
  createdAt: Date;
}
