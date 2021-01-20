import { Module } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UsersService],
})
export class AuthModule {}
