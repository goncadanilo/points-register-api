import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockData = {
    name: 'any',
    email: 'any@brainny.cc',
    password: 'any',
    role: 'employee',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: () => repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    repositoryMock.create.mockReset();
    repositoryMock.save.mockReset();
    repositoryMock.findOne.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create a user', () => {
    it('should be create a user', async () => {
      repositoryMock.create.mockReturnValue(mockData);
      repositoryMock.save.mockReturnValue(mockData);

      const savedUser = await service.createUser(mockData);

      expect(savedUser).toHaveProperty('id');
      expect(savedUser).toMatchObject(mockData);
      expect(repositoryMock.create).toBeCalledWith(mockData);
      expect(repositoryMock.create).toBeCalledTimes(1);
      expect(repositoryMock.save).toBeCalledWith(mockData);
      expect(repositoryMock.save).toBeCalledTimes(1);
    });
  });

  describe('when search user by id or email', () => {
    it('should find a user by id', async () => {
      repositoryMock.findOne.mockReturnValue(mockData);

      const id = 'any_id';
      const user = await service.findUserByIdOrEmail(id);

      expect(user).toMatchObject(mockData);
      expect(repositoryMock.findOne).toBeCalledTimes(1);
    });

    it('should find a user by email', async () => {
      repositoryMock.findOne.mockRejectedValueOnce(Error);
      repositoryMock.findOne.mockReturnValue(mockData);

      const { email } = mockData;
      const user = await service.findUserByIdOrEmail(email);

      expect(user).toMatchObject(mockData);
      expect(repositoryMock.findOne).toBeCalledTimes(2);
    });

    it('should throw if not found a user', async () => {
      repositoryMock.findOne.mockReturnValue(null);

      const { email } = mockData;

      expect(service.findUserByIdOrEmail(email)).rejects.toThrow(
        NotFoundException,
      );
      expect(repositoryMock.findOne).toBeCalledTimes(1);
    });
  });
});
