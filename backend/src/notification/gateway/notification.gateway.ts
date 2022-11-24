import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'http';
import { Logger } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';

@WebSocketGateway(1234)
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationService: NotificationService) { }

  private logger = new Logger('NotificationGateway');

  handleConnection(client: any) {
    // console.log(client);
    console.log(client.rooms);
    this.logger.log('Client connected');
  }

  handleDisconnect() {
    this.logger.log('Client disconnected');
  }

  @SubscribeMessage('message')
  async test(client: Socket, @MessageBody() createMessageDto: any) {
    console.log(client);
    console.log(createMessageDto);
    // this.server.emit('msgToClient', "test server message");
    return {event: "msgToClient", data: "test client message"};
  }

  @SubscribeMessage('createMessage')
  async create(client: any, @MessageBody() createMessageDto: any) {
    // const message = this.messageService.create(createMessageDto);
    client.emit('message', "test client message");
    // return message; 
    this.server.emit('message', "test server message");
  }
}