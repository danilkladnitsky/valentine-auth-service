import { Column, Entity, ManyToOne } from 'typeorm';
import User from './user.entity';
import BaseEntity from './base.entity';

@Entity()
export default class AuthSession extends BaseEntity {
  @Column()
  status: boolean;

  @Column({ nullable: true })
  isu: number;
}
