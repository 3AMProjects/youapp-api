import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // Find user by ID
  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  // Update profile picture (as Base64 string)
  async updateProfilePicture(
    userId: string,
    base64Image: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { profilePicture: base64Image }, // Update profilePicture field with base64 string
        { new: true },
      )
      .exec();
  }

  // Update banner (as Base64 string)
  async updateBanner(
    userId: string,
    base64Image: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { banner: base64Image }, // Update banner field with base64 string
        { new: true },
      )
      .exec();
  }
}
