import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatMessageSchema } from './chat.schema';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ChatMessage', schema: ChatMessageSchema },
    ]),
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController], // Expose the REST API for manual CRUD operations
})
export class ChatModule {}
