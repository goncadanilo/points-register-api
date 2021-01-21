import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  const serviceMock = {
    createUser: jest.fn(),
  };

  const mockData = {
    name: 'any',
    email: 'any@brainny.cc',
    password: 'any',
    role: 'EMPLOYEE',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useFactory: () => serviceMock },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  beforeEach(() => {
    serviceMock.createUser.mockReset();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('when create a user', () => {
    it('should return the created user', async () => {
      serviceMock.createUser.mockReturnValue({ ...mockData, id: 'any_id' });

      const { name, email, password } = mockData;
      const mockInput = { name, email, password, isAdmin: false };
      const user = await resolver.createUser(mockInput);

      expect(user).toHaveProperty('id');
      expect(user).toMatchObject(mockData);
      expect(serviceMock.createUser).toBeCalledWith(mockInput);
      expect(serviceMock.createUser).toBeCalledTimes(1);
    });
  });
});
