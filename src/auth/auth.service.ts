import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthInput } from './dtos/auth.input';
import { AuthType } from './dtos/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.usersService.findUserByIdOrEmail(data.email);

    const validPasssword = compareSync(data.password, user.password);

    if (!validPasssword) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
