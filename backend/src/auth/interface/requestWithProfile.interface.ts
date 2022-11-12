import { Request } from "express";
import { Profile } from "src/database/model/profile.model";

interface RequestWithProfile extends Request {
    profile: Profile;
}

export default RequestWithProfile;