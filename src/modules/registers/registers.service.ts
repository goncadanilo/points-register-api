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

  async createRegister(data: CreateRegisterInput): Promise<Register> {
    const register = this.repository.create(data);
    return this.repository.save(register);
  }
}
