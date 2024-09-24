import { Schema } from 'mongoose';

export const ProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateOfBirth: { type: Date, required: true },
  zodiacSign: { type: String }, // Example additional field
});
