import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dtos/auth.input';
import { AuthType } from './dtos/auth.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('data') data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);

    return {
      user: response.user,
      token: response.token,
    };
  }
}
