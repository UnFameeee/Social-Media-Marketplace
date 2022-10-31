import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Socket } from 'socket.io';
import { Server } from 'http';
import { Logger } from '@nestjs/common';

@WebSocketGateway(1234)
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) { }

  private logger = new Logger('MessageGateway');

  handleConnection(client: any) {
    // client.emit('connection', 'successfully connect to server');
    this.logger.log('Client connected');
  }

  handleDisconnect() {
    this.logger.log('Client disconnected');
  }

  @SubscribeMessage('message')
  async test(client: Socket, @MessageBody() createMessageDto: any) {
    console.log(client);
    // client.emit('message', createMessageDto);
    console.log(createMessageDto);
    this.server.emit('msgToClient', "test server message");
    return {event: "msgToClient", data: "test client message"};
  }

  @SubscribeMessage('createMessage')
  async create(client: any, @MessageBody() createMessageDto: CreateMessageDto) {
    // const message = this.messageService.create(createMessageDto);
    client.emit('message', "test client message");
    // return message; 
    this.server.emit('message', "test server message");
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('/join')
  async joinRoom(client: Socket) {
    return "con cho duy duong bu cu cho"
  }

  @SubscribeMessage('typing')
  async typing() {

  }
}
