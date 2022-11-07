import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from "src/common/constants/provider.constant";
import { RoomImage } from "../model/room_image";

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