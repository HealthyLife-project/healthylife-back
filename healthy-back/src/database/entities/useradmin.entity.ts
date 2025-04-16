import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  userid: string; // 사용자가 입력하는 ID

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;
}
