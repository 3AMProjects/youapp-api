import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; // Remove Schema from mongoose

// Define the User class (schema structure)
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}

// Create the User schema from the User class
export const UserSchema = SchemaFactory.createForClass(User);

// Create a TypeScript type for the User document (including Mongoose document methods like toObject)
export type UserDocument = User & Document;
