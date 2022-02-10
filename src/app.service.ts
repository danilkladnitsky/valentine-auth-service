import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import AuthSession from './entities/auth_session.entity';
import User from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(AuthSession)
    private readonly authRepository: Repository<AuthSession>,
  ) {}
  async getToken(code: string): Promise<string> {
    try {
      const { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, REDIRECT_URI } =
        process.env;

      const data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: GRANT_TYPE,
        redirect_uri: REDIRECT_URI,
        code,
      };

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
        Host: 'login.itmo.ru',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      };

      const morphData = Object.keys(data)
        .map((key) => `${key}=${encodeURIComponent(data[key])}`)
        .join('&');

      const res = await axios.post(
        'https://login.itmo.ru/auth/realms/itmo/protocol/openid-connect/token',
        morphData,
        {
          headers,
        },
      );

      const { access_token } = res.data;

      return access_token as string;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  async getUserByToken(access_token: string) {
    const headers = {
      Accept: '*/*',
      Host: 'login.itmo.ru',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Authorization: `Bearer ${access_token}`,
    };

    try {
      const res = await axios.get(
        'https://login.itmo.ru/auth/realms/itmo/protocol/openid-connect/userinfo',
        {
          headers,
        },
      );

      await this.saveUser(res.data);

      await this.saveAuthSession({ ...res.data });

      return res.data;
    } catch (err) {
      console.log(err);
      this.saveAuthSession({});

      throw new BadRequestException();
    }
  }

  async saveAuthSession(session: Partial<AuthSession>) {
    await this.authRepository.save({
      status: Boolean(session.isu),
      isu: session.isu,
    });
  }

  async saveUser(user: User) {
    const userExists = Boolean(
      (await this.userRepository.find({ isu: user.isu })).length,
    );

    if (!userExists) {
      this.userRepository.save(user);
    }
  }
}
