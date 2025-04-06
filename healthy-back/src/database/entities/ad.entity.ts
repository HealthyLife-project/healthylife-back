import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Adb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imgsrc: string;

  @Column({ nullable: true })
  imgsrcAder: string;
}
