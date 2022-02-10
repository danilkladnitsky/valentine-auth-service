import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller('/')
@ApiTags('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/token')
  async getToken(@Query('code') code: string) {
    if (!code) {
      throw new BadRequestException();
    }

    return await this.appService.getToken(code);
  }

  @Get('/userByToken')
  async getUserByToken(@Query('access_token') access_token: string) {
    if (!access_token) {
      throw new BadRequestException();
    }

    return await this.appService.getUserByToken(access_token);
  }

  @Get('/auth')
  async getUser(@Query('code') code: string) {
    if (!code) {
      throw new BadRequestException();
    }

    const access_token = await this.appService.getToken(code);
    const user = await this.appService.getUserByToken(access_token);
    return user;
  }
}
