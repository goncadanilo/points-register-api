import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const usersServiceMock = {
    findUserByIdOrEmail: jest.fn(),
  };

  const jwtServiceMock = {
    signAsync: jest.fn(),
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
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    usersServiceMock.findUserByIdOrEmail.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when validate user', () => {
    it('should validate user', async () => {
      const password = hashSync(mockData.password, 10);
      usersServiceMock.findUserByIdOrEmail.mockReturnValue({
        ...mockData,
        password,
      });
      jwtServiceMock.signAsync.mockReturnValue('valid_token');

      const result = await service.validateUser(mockData);

      expect(result).toHaveProperty('token');
      expect(usersServiceMock.findUserByIdOrEmail).toBeCalledTimes(1);
    });

    it('should throw if user password is invalid', async () => {
      usersServiceMock.findUserByIdOrEmail.mockReturnValue(mockData);

      expect(service.validateUser(mockData)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersServiceMock.findUserByIdOrEmail).toBeCalledTimes(1);
    });
  });
});
