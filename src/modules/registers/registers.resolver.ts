import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateRegisterInput } from './dtos/create-register.input';
import { Register } from './entities/register.entity';
import { RegistersService } from './registers.service';

const pubSub = new PubSub();

@Resolver('Register')
export class RegistersResolver {
  constructor(private registersService: RegistersService) {}

  @Mutation(() => Register)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.EMPLOYEE)
  async createRegister(
    @Args('data') data: CreateRegisterInput,
    @CurrentUser() user: User,
  ): Promise<Register> {
    const register = await this.registersService.createRegister(data, user.id);

    pubSub.publish('registerAdded', { registerAdded: register });

    return register;
  }

  @Query(() => [Register])
  @UseGuards(GqlAuthGuard)
  async findRegistersByUserId(@Args('id') id: string): Promise<Register[]> {
    return await this.registersService.findRegistersByUserId(id);
  }

  @Query(() => [Register])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRATOR)
  async findAllRegisters(): Promise<Register[]> {
    return await this.registersService.findAllRegisters();
  }

  @Subscription(() => Register)
  registerAdded() {
    return pubSub.asyncIterator('registerAdded');
  }
}
