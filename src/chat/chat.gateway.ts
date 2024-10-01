import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    console.log('Socket.IO initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Subscribe to 'joinRoom' event
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string): Promise<void> {
    client.join(room);
    this.server
      .to(room)
      .emit('message', `User ${client.id} has joined the room ${room}`);
  }

  // Subscribe to 'sendMessage' event
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    {
      room,
      senderId,
      receiverId,
      message,
    }: { room: string; senderId: string; receiverId: string; message: string },
  ): Promise<void> {
    // Save the message to the database
    const savedMessage = await this.chatService.createMessage(
      room,
      senderId,
      receiverId,
      message,
    );

    // Broadcast the message to everyone in the room
    this.server.to(room).emit('message', savedMessage);
  }

  // Subscribe to 'getMessages' event (retrieve chat history)
  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, room: string): Promise<void> {
    const messages = await this.chatService.getMessagesByRoom(room);
    client.emit('chatHistory', messages);
  }
}
