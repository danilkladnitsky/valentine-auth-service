import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from './user.entity';

@Entity()
export default class AuthSession extends BaseEntity {
  @PrimaryGeneratedColumn()
  isu: number;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @Column()
  email: string;

  @Column()
  ip: string;
}
