import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
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

    const res = await axios.get(
      'https://login.itmo.ru/auth/realms/itmo/protocol/openid-connect/userinfo',
      {
        headers,
      },
    );

    return res.data;
  }
}
