import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module'; // Import UsersModule

@Module({
  imports: [
    UsersModule, // Import UsersModule here
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your JWT secret from .env
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
