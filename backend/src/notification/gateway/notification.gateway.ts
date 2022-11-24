import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';

@WebSocketGateway(1234)
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  //emit -> send
  //on -> receive
  //server.emit -> broadcast to all client

  constructor(private readonly notificationService: NotificationService) { }

  private logger = new Logger('NotificationGateway');

  handleConnection(client: Socket) {
    this.logger.log('Client connected');
  }

  handleDisconnect() {
    this.logger.log('Client disconnected');
  }

  @SubscribeMessage('join_room')
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    const profileId = payload.profile_id.toString();
    client.join(profileId);
    this.server.to(profileId).emit('join_room', `Profile join room ${profileId}`);
  }

  @SubscribeMessage('send_notification')
  async sendNotification(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    //send the notification to the specific profile_id
    const profileId = payload.profile_id.toString();
    this.server.to(profileId).emit('receive_notification', payload.notification);
  }
}