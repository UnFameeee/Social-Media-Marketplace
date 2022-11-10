import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from "src/common/providers/provider.constant";
import { DescriptionEntity } from "src/common/models/entity/description";
import { Description } from "../model/description.model";
import { Profile } from "../model/profile.model";

@Injectable()
export class DescriptionRepository {
    constructor(
        @Inject(PROVIDER.Description) private descriptionRepository: typeof Description
    ) { }

    async createProfileDescription(profile_id: number): Promise<Description> {
        try {
            const newDescription = new DescriptionEntity;
            newDescription.profile_id = profile_id;
            const queryCreateData = await this.descriptionRepository.create(newDescription);
            return await this.descriptionRepository.findOne({
                where: { description_id: queryCreateData.description_id }
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateProfileDescription(profile_id: number, data: Description): Promise<Description> {
        try {
            const queryData = await this.descriptionRepository.findOne({
                include: [
                    {
                        model: Profile,
                        where: {
                            profile_id: profile_id
                        },
                        attributes: [],
                    }
                ]
            });
            await this.descriptionRepository.update(data, { where: { description_id: queryData.description_id } });
            return await this.descriptionRepository.findOne({
                where: { description_id: queryData.description_id }
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}