import { Module } from '@nestjs/common';
import { RegistersService } from './registers.service';

@Module({
  providers: [RegistersService],
})
export class RegistersModule {}
