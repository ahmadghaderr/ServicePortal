import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled',
}

export enum Department {
  IT = 'IT',
  HR = 'HR',
  FACILITIES = 'facilities',
  FINANCE = 'finance',
}

@Entity('service_requests')
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: Department })
  department: Department;

  @Column({ type: 'enum', enum: Status, default: Status.ACCEPTED })
  status: Status;

  @Column()
  requesterEmail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
