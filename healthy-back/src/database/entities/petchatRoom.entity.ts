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

  @Column({ length: 255, nullable: true })
  time: string;
  @Column({ nullable: true })
  cnt: Number;
  @CreateDateColumn()
  createdAt: Date;
}
