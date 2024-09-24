import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return a JWT token when login is successful', async () => {
    const result = await service.login({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toHaveProperty('access_token');
  });
});
