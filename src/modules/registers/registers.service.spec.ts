import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { RegistersService } from './registers.service';

describe('RegistersService', () => {
  let service: RegistersService;

  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockData = {
    userId: 'any_id',
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
    repositoryMock.find.mockReset();
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
        userId: 'any_id',
      });
      expect(repositoryMock.create).toBeCalledTimes(1);
      expect(repositoryMock.save).toBeCalledWith(mockData);
      expect(repositoryMock.save).toBeCalledTimes(1);
    });
  });

  describe('when search register by user id', () => {
    it('should find all the registers of a user by their id', async () => {
      repositoryMock.find.mockReturnValue([mockData, mockData]);

      const userId = 'any_id';
      const registers = await service.findRegistersByUserId(userId);

      expect(registers).toHaveLength(2);
      expect(repositoryMock.find).toBeCalledWith({ userId });
      expect(repositoryMock.find).toBeCalledTimes(1);
    });
  });

  describe('when search all registers', () => {
    it('should find all registers', async () => {
      repositoryMock.find.mockReturnValue([mockData, mockData, mockData]);

      const registers = await service.findAllRegisters();

      expect(registers).toHaveLength(3);
      expect(repositoryMock.find).toBeCalledTimes(1);
    });
  });
});
