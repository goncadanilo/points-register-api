import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/enum/role.enum';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.repository.create(data);
    user.role = data.isAdmin ? Role.ADMINISTRATOR : Role.EMPLOYEE;

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

  async findAllUsers(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}
