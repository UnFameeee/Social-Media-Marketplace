import { Inject, Injectable } from "@nestjs/common";
import { PROVIDER } from "src/common/constants/provider.constant";
import { Profile } from "../profile/model/profile.model";

@Injectable()
export class ProfileRepository {
    constructor(@Inject(PROVIDER.Profile) private profileRepository: typeof Profile) {}

    
}