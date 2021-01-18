import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/modules/category/category.repository';

import { Listing } from './listing.entity';
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingService {
    constructor(
        @InjectRepository(Listing) 
        private readonly listingRepository: ListingRepository,
        private readonly categoryRepository: CategoryRepository
    ){}

    async findAllCategories() : Promise<Listing[]> {
        return await this.listingRepository.find();
    }

    async findOneListing(id: string) : Promise<Listing> {
        return await this.listingRepository.findOne(id);
    }

    async createListing(data: Listing): Promise<Listing>{
        return await this.listingRepository.createNew(data);
    }

    async updateListing(id:string, data: Listing): Promise<Listing>{
        return await this.listingRepository.updateExisting(id, data);
    }

    async deleteListing(data: Listing): Promise<any> {
        return await this.listingRepository.deleteExisting(data);
    }
}
