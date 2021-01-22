import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegisterInput } from './dtos/create-register.input';
import { Register } from './entities/register.entity';

@Injectable()
export class RegistersService {
  constructor(
    @InjectRepository(Register) private repository: Repository<Register>,
  ) {}

  async createRegister(
    data: CreateRegisterInput,
    id: string,
  ): Promise<Register> {
    const register = this.repository.create({ ...data, id });
    return await this.repository.save(register);
  }

  async findRegistersByUserId(userId: string): Promise<Register[]> {
    const registers = await this.repository.find({ userId });
    return registers;
  }
}
