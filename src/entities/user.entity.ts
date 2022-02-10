import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';

@Entity()
export default class User extends BaseEntity {
  @Column()
  isu: number;

  @Column()
  name: string;

  @Column()
  avatar_url: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  birthdate: string;
}
