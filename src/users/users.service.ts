import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/create-user.input';
import { User } from './entities/user.entity';
import { Role } from './enum/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.repository.create(data);
    user.role = data.admin ? Role.ADMINISTRATOR : Role.EMPLOYEE;

    return this.repository.save(user);
  }

  async findUserByIdOrEmail(data: string): Promise<User> {
    let user: User;

    try {
      user = await this.repository.findOne(data);
    } catch {
      user = await this.repository.findOne({ email: data });
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
