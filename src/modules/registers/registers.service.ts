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
    userId: string,
  ): Promise<Register> {
    const register = this.repository.create({ ...data, userId });
    return await this.repository.save(register);
  }

  async findRegistersByUserId(userId: string): Promise<Register[]> {
    const registers = await this.repository.find({ userId });
    return registers;
  }

  async findAllRegisters(): Promise<Register[]> {
    const registers = await this.repository.find();
    return registers;
  }
}
