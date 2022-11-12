import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { RoomImage } from "src/database/model/room_image";
import { PROVIDER } from "src/database/providers/provider.constant";


@Injectable()
export class RoomImageRepository {
    constructor(
        @Inject(PROVIDER.ChatroomImage) private chatRoomImageRepository: typeof RoomImage
    ) { };
    async testfunction() {
        try {
            
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}