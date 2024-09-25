import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './users.schema'; // Import UserDocument type

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // Find user by email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Find user by ID
  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec(); // Use Mongoose's findById method
  }

  // Create a new user
  async create(userData: Partial<UserDocument>): Promise<UserDocument> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }
}
