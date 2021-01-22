import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { RegistersService } from './registers.service';

describe('RegistersService', () => {
  let service: RegistersService;

  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockData = {
    timeRegistered: new Date(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistersService,
        { provide: getRepositoryToken(Register), useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<RegistersService>(RegistersService);
  });

  beforeEach(() => {
    repositoryMock.create.mockReset();
    repositoryMock.save.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create a register', () => {
    it('should be create a employee', async () => {
      repositoryMock.create.mockReturnValue(mockData);
      repositoryMock.save.mockReturnValue({ ...mockData, id: 'any_id' });

      const register = await service.createRegister(mockData, 'any_id');

      expect(register).toHaveProperty('id');
      expect(register).toMatchObject(mockData);
      expect(repositoryMock.create).toBeCalledWith({
        ...mockData,
        id: 'any_id',
      });
      expect(repositoryMock.create).toBeCalledTimes(1);
      expect(repositoryMock.save).toBeCalledWith(mockData);
      expect(repositoryMock.save).toBeCalledTimes(1);
    });
  });
});
