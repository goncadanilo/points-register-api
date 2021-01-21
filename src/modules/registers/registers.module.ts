import { Module } from '@nestjs/common';
import { RegistersService } from './registers.service';
import { RegistersResolver } from './registers.resolver';

@Module({
  providers: [RegistersService, RegistersResolver],
})
export class RegistersModule {}
