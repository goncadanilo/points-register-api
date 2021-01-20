import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const repositoryFactory = {
  findOne: jest.fn(),
};

const mockData = {
  name: 'any',
  email: 'any@brainny.cc',
  password: 'any',
  role_id: '2',
};

describe('UsersService', () => {
  let service: UsersService;
  let repository;

  beforeEach(async () => {
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
  });
});
