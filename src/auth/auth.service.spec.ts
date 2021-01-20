import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import { UsersService } from 'users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService;

  const usersServiceFactory = {
    findUserByEmail: jest.fn(),
  };

  const mockData = {
    email: 'any@brainny.cc',
    password: 'any',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useFactory: () => usersServiceFactory },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    usersService.findUserByEmail.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when validate user', () => {
    it('should validate user', async () => {
      const password = hashSync(mockData.password, 10);
      usersService.findUserByEmail.mockReturnValue({ ...mockData, password });

      const result = await service.validateUser(mockData);

      expect(result).toHaveProperty('token');
      expect(usersService.findUserByEmail).toBeCalledWith(mockData.email);
      expect(usersService.findUserByEmail).toBeCalledTimes(1);
    });

    it('should throw if user password is invalid', async () => {
      usersService.findUserByEmail.mockReturnValue(mockData);

      expect(service.validateUser(mockData)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findUserByEmail).toBeCalledWith(mockData.email);
      expect(usersService.findUserByEmail).toBeCalledTimes(1);
    });
  });
});
