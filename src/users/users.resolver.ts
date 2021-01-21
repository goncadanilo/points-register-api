import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dtos/create-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.userService.createUser(data);
  }
}
