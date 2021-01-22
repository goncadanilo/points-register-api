import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { RegistersResolver } from './registers.resolver';
import { RegistersService } from './registers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Register])],
  providers: [RegistersService, RegistersResolver],
})
export class RegistersModule {}
