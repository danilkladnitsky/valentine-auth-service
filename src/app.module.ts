import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import AuthSession from './entities/auth_session.entity';
import User from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([AuthSession, User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
