import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';

@Entity()
export default class User extends BaseEntity {
  @Column()
  isu: number;

  @Column()
  name: string;

  @Column({
    default:
      'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png',
  })
  avatar_url: string;

  @Column({ default: 'no_nickname' })
  nickname: string;

  @Column()
  email: string;

  @Column({ default: 'no_birthdate' })
  birthdate: string;
}
