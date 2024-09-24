import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), // Use environment variable for MongoDB URI
    AuthModule,
    UsersModule,
    ProfileModule,
  ],
})
export class AppModule {}
