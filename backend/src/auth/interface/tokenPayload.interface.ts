class TempProfile {
    profile_id: number;
    profile_name: string;
    birth: string;
}
export interface TokenPayload {
    profile: TempProfile;
}