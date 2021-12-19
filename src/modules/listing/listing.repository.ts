import {Injectable} from "@nestjs/common";
import { EntityManager, EntityRepository, Repository, Transaction, TransactionManager } from "typeorm";
import { CreateListDto } from "./dto/create-list.dto";

import { Listing } from "./listing.entity";
import { UpdateListDto } from "./dto/update-list.dto";

@Injectable()
@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {

	async saveListing(
		createListDto: CreateListDto
	) {		
		const {
			listingTitle,
			listingDescription,
			tradeType,
			isFeatured,
			isPaid,
			isUrgent,
			category
		} = createListDto;
		//console.log("manager", manager);
		console.log("dto", createListDto);
		
		let listing = new Listing();

		listing.listingTitle = listingTitle;
		listing.listingDescription = listingDescription;
		listing.listingSlug = "test";
		listing.tradeType = tradeType;
		listing.isFeatured = isFeatured;
		listing.isPaid = isPaid;
		listing.isUrgent = isUrgent;
		listing.isDeleted = 0;
		listing.status = 1;
		listing.category = category;

		return await this.save(listing);
	}

	async updateListing(updateData: UpdateListDto): Promise<Listing> {
		return await this.save(updateData);
	}

	async softDeleteCategory(id: number) {
		return await this.softDelete({ id });
	}

	async updateIsDeleted(id: number) {
		return await this.update({ id }, { isDeleted: 1 });
	}
}
