import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
