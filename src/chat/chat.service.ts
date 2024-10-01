import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('ChatMessage') private chatModel: Model<ChatMessageDocument>,
  ) {}

  // Save a new message to MongoDB
  async saveMessage(
    room: string,
    senderId: string,
    receiverId: string,
    message: string,
  ): Promise<ChatMessage> {
    const newMessage = new this.chatModel({
      room,
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    });
    return newMessage.save();
  }

  // Retrieve messages by room (for chat history)
  async getMessagesByRoom(room: string): Promise<ChatMessage[]> {
    return this.chatModel.find({ room }).sort({ timestamp: 1 }).exec();
  }
}
