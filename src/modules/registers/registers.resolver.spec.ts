import { Test, TestingModule } from '@nestjs/testing';
import { RegistersResolver } from './registers.resolver';

describe('RegistersResolver', () => {
  let resolver: RegistersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistersResolver],
    }).compile();

    resolver = module.get<RegistersResolver>(RegistersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
