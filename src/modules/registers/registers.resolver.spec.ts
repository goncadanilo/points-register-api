import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { RegistersResolver } from './registers.resolver';
import { RegistersService } from './registers.service';

describe('RegistersResolver', () => {
  let resolver: RegistersResolver;

  const serviceMock = {
    createRegister: jest.fn(),
  };

  const mockData = {
    userId: 'any_id',
    timeRegistered: new Date(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistersResolver,
        { provide: RegistersService, useValue: serviceMock },
      ],
    }).compile();

    resolver = module.get<RegistersResolver>(RegistersResolver);
  });

  beforeEach(() => {
    serviceMock.createRegister.mockReset();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('when create a register', () => {
    it('should return the created register', async () => {
      serviceMock.createRegister.mockReturnValue({ ...mockData, id: 'any_id' });

      const user = new User();
      user.id = 'any_id';

      const register = await resolver.createRegister(mockData, user);

      expect(register).toHaveProperty('id');
      expect(register).toMatchObject(mockData);
      expect(serviceMock.createRegister).toBeCalledWith(mockData, user.id);
      expect(serviceMock.createRegister).toBeCalledTimes(1);
    });
  });
});
