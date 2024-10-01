import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatMessageSchema } from './chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ChatMessage', schema: ChatMessageSchema },
    ]), // Connect ChatMessage schema
  ],
  providers: [ChatGateway, ChatService], // Provide ChatGateway and ChatService
})
export class ChatModule {}
