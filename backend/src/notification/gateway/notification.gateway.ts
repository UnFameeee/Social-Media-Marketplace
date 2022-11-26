import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';
import { SOCKET_EVENT } from 'src/common/constants/socket.constant';

@WebSocketGateway(1234, { cors: true })
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  //emit -> send
  //on -> receive
  //server.emit -> broadcast to all client

  constructor(private readonly notificationService: NotificationService) { }

  private logger = new Logger('NotificationGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client room: ${client.rooms} connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client room: ${client.rooms} disconnected`);
  }

  @SubscribeMessage(SOCKET_EVENT.JOIN_ROOM)
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    const profileId = payload.profile_id.toString();
    client.join(profileId);
    this.server.to(profileId).emit(SOCKET_EVENT.JOIN_ROOM, `Profile join room ${profileId}`);
  }

  @SubscribeMessage(SOCKET_EVENT.SEND_NOTIFICATION)
  async sendNotification(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    //send the notification to the specific profile_id
    const profileId = payload.profile_id.toString();
    const data = {
      avatar: payload.avatar,
      profile_name: payload.profile_name,
      content: payload.content,
    }
    client.to(profileId).emit(SOCKET_EVENT.RECEIVE_NOTIFICATION, data)
    // this.server.to(profileId).emit();
  }
}