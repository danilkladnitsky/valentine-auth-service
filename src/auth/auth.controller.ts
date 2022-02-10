import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('get.user.token')
  async getToken(@Query('code') code: string) {
    if (!code) {
      throw new BadRequestException();
    }

    return await this.authService.getToken(code);
  }

  @MessagePattern('get.user.by.token')
  async getUserByToken(@Query('access_token') access_token: string) {
    if (!access_token) {
      throw new BadRequestException();
    }

    return await this.authService.getUserByToken(access_token);
  }

  @MessagePattern('auth.user')
  async getUser(@Payload() data) {
    if (!data.code) {
      throw new RpcException('Bad request');
    }

    const access_token = await this.authService.getToken(data.code);
    const user = await this.authService.getUserByToken(access_token);
    return user;
  }
}
