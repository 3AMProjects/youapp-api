import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('ChatMessage') private chatModel: Model<ChatMessageDocument>,
  ) {}

  // Create a new chat message
  async createMessage(
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
    return newMessage.save(); // Save the message to the DB
  }

  // Get all messages in a chat room (Read operation)
  async getMessagesByRoom(room: string): Promise<ChatMessage[]> {
    return this.chatModel.find({ room }).sort({ timestamp: 1 }).exec(); // Sort by timestamp
  }

  // Get a specific message by ID
  async getMessageById(messageId: string): Promise<ChatMessage> {
    const message = await this.chatModel.findById(messageId).exec();
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
    return message;
  }

  // Update an existing message (Update operation)
  async updateMessage(
    messageId: string,
    updatedContent: string,
  ): Promise<ChatMessage> {
    const message = await this.chatModel
      .findByIdAndUpdate(
        messageId,
        { message: updatedContent, updatedAt: new Date() },
        { new: true },
      )
      .exec();
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
    return message;
  }

  // Delete a specific message (Delete operation)
  async deleteMessage(messageId: string): Promise<void> {
    const message = await this.chatModel.findByIdAndDelete(messageId).exec();
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
  }
}
