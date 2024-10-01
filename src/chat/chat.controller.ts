import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Create a new chat message (POST /chat/messages)
  @Post('messages')
  async createMessage(
    @Body('room') room: string,
    @Body('senderId') senderId: string,
    @Body('receiverId') receiverId: string,
    @Body('message') message: string,
  ) {
    return this.chatService.createMessage(room, senderId, receiverId, message);
  }

  // Get all messages in a room (GET /chat/rooms/:room/messages)
  @Get('rooms/:room/messages')
  async getMessagesByRoom(@Param('room') room: string) {
    return this.chatService.getMessagesByRoom(room);
  }

  // Get a specific message by ID (GET /chat/messages/:id)
  @Get('messages/:id')
  async getMessageById(@Param('id') messageId: string) {
    return this.chatService.getMessageById(messageId);
  }

  // Update a message by ID (PUT /chat/messages/:id)
  @Put('messages/:id')
  async updateMessage(
    @Param('id') messageId: string,
    @Body('message') updatedContent: string,
  ) {
    return this.chatService.updateMessage(messageId, updatedContent);
  }

  // Delete a message by ID (DELETE /chat/messages/:id)
  @Delete('messages/:id')
  async deleteMessage(@Param('id') messageId: string) {
    return this.chatService.deleteMessage(messageId);
  }
}
