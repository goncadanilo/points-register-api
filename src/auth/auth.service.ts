import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthInput } from './dtos/auth.input';
import { AuthType } from './dtos/auth.type';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.usersService.findUserByEmail(data.email);

    const validPasssword = compareSync(data.password, user.password);

    if (!validPasssword) {
      throw new UnauthorizedException('Incorrect password');
    }

    return {
      user,
      token: 'token',
    };
  }
}
