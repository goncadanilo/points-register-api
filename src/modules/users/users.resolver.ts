import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from '../../common/enum/role.enum';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { CreateUserInput } from './dtos/create-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRATOR)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.userService.createUser(data);
  }
}
