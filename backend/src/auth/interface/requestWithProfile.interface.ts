import { Request } from "express";
import { Profile } from "src/social-media/profile/model/profile.model";

interface RequestWithProfile extends Request {
    profile: Profile;
}

export default RequestWithProfile;