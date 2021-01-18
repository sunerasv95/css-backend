import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "src/modules/category/category.entity";
import { EntityRepository, Repository } from "typeorm";

import { Listing } from "./listing.entity";

@Injectable()
@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
    async createNew(data: Listing): Promise<Listing>{
        let category, catId = null;
        let entity = new Listing();

        catId = data.category;
        category = await this.findOne(catId);

        entity.title            = data.title;
        entity.description      = data.description;
        entity.slug             = data.slug;
        entity.listType         = data.listType;
        entity.referenceNumber  = data.referenceNumber;
        entity.category         = category;
        entity.publishedAt      = data.publishedAt;
        entity.isActive         = data.isActive;

        return await this.save(entity);
    }

    async updateExisting(id: string, data: Listing): Promise<Listing>{
        await this.update({ id: id } , data );
        return await this.findOne(id);
    }

    async deleteExisting(data: Listing): Promise<any>{
        let result = await this.delete(data.id);
        if(result.affected == 0) {
            throw new NotFoundException('Listing couldn\'t found');
        }else{
            return { deleted: true };
        }
    }
}