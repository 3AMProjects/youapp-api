import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ChatMessage extends Document {
  @Prop({ required: true })
  room: string; // Room ID for 1-to-1 chats

  @Prop({ required: true })
  senderId: string; // Sender user ID

  @Prop({ required: true })
  receiverId: string; // Receiver user ID

  @Prop({ required: true })
  message: string; // The actual chat message

  @Prop({ default: Date.now })
  timestamp: Date; // Timestamp for when the message was sent
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
export type ChatMessageDocument = ChatMessage & Document;
