import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const usersServiceMock = {
    findUserByEmail: jest.fn(),
  };

  const mockData = {
    email: 'any@brainny.cc',
    password: 'admin123',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    usersServiceMock.findUserByEmail.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when validate user', () => {
    it('should validate user', async () => {
      const password = hashSync(mockData.password, 10);
      usersServiceMock.findUserByEmail.mockReturnValue({
        ...mockData,
        password,
      });

      const result = await service.validateUser(mockData);

      expect(result).toHaveProperty('token');
      expect(usersServiceMock.findUserByEmail).toBeCalledWith(mockData.email);
      expect(usersServiceMock.findUserByEmail).toBeCalledTimes(1);
    });

    it('should throw if user password is invalid', async () => {
      usersServiceMock.findUserByEmail.mockReturnValue(mockData);

      expect(service.validateUser(mockData)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersServiceMock.findUserByEmail).toBeCalledWith(mockData.email);
      expect(usersServiceMock.findUserByEmail).toBeCalledTimes(1);
    });
  });
});
