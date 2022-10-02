import { PROVIDER } from "src/common/constants/provider.constant";
import { Auth } from "./model/claim.model";

export const authProviders = [
    {
        provide: PROVIDER.Auth,
        useValue: Auth,
    }
]