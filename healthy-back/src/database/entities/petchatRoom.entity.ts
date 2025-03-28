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
  @Column({ unique: true })
  userid: string;

  @Column({ length: 255, unique: true })
  time: string;

  @CreateDateColumn()
  createdAt: Date;
}
