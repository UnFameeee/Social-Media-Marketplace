import { InternalServerErrorException } from "@nestjs/common";

export function ExceptionResponse(res: Response){
    if(res.status != 500){
        throw res;
    }
    throw new InternalServerErrorException(res["message"]);
}   