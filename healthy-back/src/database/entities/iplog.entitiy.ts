import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IpLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ipAddress: string;

  @Column()
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
