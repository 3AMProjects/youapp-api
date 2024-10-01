import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define the Profile schema to store user profile-related information
@Schema()
export class User {
  // Required fields for authentication
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Profile-related fields
  @Prop()
  displayName: string; // Optional field for display name

  @Prop({ required: true })
  gender: string; // Required gender field (Male, Female, Other)

  @Prop({ required: true })
  birthday: Date; // Required birthday field

  // Optional fields for additional profile details
  @Prop()
  horoscope: string; // Calculated based on birthday

  @Prop()
  zodiac: string; // Calculated based on birthday

  @Prop()
  height: number; // Optional height in cm

  @Prop()
  weight: number; // Optional weight in kg

  @Prop()
  profilePicture: string; // URL for the profile picture

  @Prop()
  banner: string; // URL for the banner image
}

// Create the schema for Mongoose from the User class
export const UserSchema = SchemaFactory.createForClass(User);

// Create a Mongoose Document type for the User, including Mongoose document methods
export type UserDocument = User & Document;
