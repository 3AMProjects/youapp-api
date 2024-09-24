import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './users.schema'; // Import the UserSchema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Register User schema
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService so it can be used in other modules
})
export class UsersModule {}
