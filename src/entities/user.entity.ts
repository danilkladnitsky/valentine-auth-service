import { Column } from 'typeorm';
import BaseEntity from './base.entity';

export default class User extends BaseEntity {
  @Column()
  isu: number;

  @Column()
  gender: string;

  @Column()
  avatar_url: string;

  @Column()
  email: string;
}
