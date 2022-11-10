import { PROVIDER } from "src/common/providers/provider.constant";
import { Auth } from "./model/claim.model";

export const authProviders = [
    {
        provide: PROVIDER.Auth,
        useValue: Auth,
    }
]