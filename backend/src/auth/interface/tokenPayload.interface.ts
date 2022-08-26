import { Role } from "src/common/constants/role.constant";

class TempProfile {
    profile_id: number;
    profile_name: string;
    birth: string;
    role: Role;
}
export interface TokenPayload {
    profile: TempProfile;
}