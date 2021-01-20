import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository;

  const repositoryFactory = {
    findOne: jest.fn(),
  };

  const mockData = {
    name: 'any',
    email: 'any@brainny.cc',
    password: 'any',
    role_id: '2',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: () => repositoryFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  beforeEach(() => {
    repository.findOne.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when search user by email', () => {
    it('should find a user by email', async () => {
      repository.findOne.mockReturnValue(mockData);

      const { email } = mockData;
      const user = await service.findUserByEmail(email);

      expect(user).toMatchObject(mockData);
      expect(repository.findOne).toBeCalledWith({ email });
      expect(repository.findOne).toBeCalledTimes(1);
    });

    it('should throw if not found a user', async () => {
      repository.findOne.mockReturnValue(null);

      const { email } = mockData;

      expect(service.findUserByEmail(email)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toBeCalledWith({ email });
      expect(repository.findOne).toBeCalledTimes(1);
    });
  });
});
