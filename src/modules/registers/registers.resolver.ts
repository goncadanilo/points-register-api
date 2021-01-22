import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateRegisterInput } from './dtos/create-register.input';
import { Register } from './entities/register.entity';
import { RegistersService } from './registers.service';

@Resolver('Register')
export class RegistersResolver {
  constructor(private registersService: RegistersService) {}

  @Mutation(() => Register)
  @UseGuards(GqlAuthGuard)
  async createRegister(
    @Args('data') data: CreateRegisterInput,
    @CurrentUser() user: User,
  ): Promise<Register> {
    return await this.registersService.createRegister(data, user.id);
  }

  @Query(() => [Register])
  @UseGuards(GqlAuthGuard)
  async findRegistersByUserId(@CurrentUser() user: User): Promise<Register[]> {
    return await this.registersService.findRegistersByUserId(user.id);
  }

  @Query(() => [Register])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMINISTRATOR)
  async findAllRegisters(): Promise<Register[]> {
    return await this.registersService.findAllRegisters();
  }
}
