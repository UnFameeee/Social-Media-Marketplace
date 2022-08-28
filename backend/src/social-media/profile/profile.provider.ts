import { PROVIDER } from "src/common/constants/provider.constant";
import { Profile } from "./model/profile.model";

export const profileProviders = [
    {
        provide: PROVIDER.Profile,
        useValue: Profile
    }
]