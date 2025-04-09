import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PersonChatRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  userid: string;

  @Column({ nullable: true })
  title: string;

  @Column({ length: 255, nullable: true })
  time: string;

  @Column()
  imgsrc: string;
  @Column({ nullable: true, default: 1 })
  cnt: number;
  @CreateDateColumn()
  createdAt: Date;
}
