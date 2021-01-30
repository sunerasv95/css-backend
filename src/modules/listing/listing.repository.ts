import {
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { from } from "rxjs";
import { EntityRepository, Repository } from "typeorm";
import { CreateListDto } from "./dto/create-list.dto";

import { Listing } from "./listing.entity";
import { slugify } from "./../../common/helpers";
import { UpdateListDto } from "./dto/update-list.dto";
import { ListingIdDto } from "./dto/list-id.dto";

@Injectable()
@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
	async createNew(
		data: CreateListDto,
		relations: any[] = []
	): Promise<Listing> {
		try {
			let newListing = new Listing();

			newListing.title = data.title;
			newListing.description = data.description;
			newListing.listType = data.listType;
			newListing.listPrice = data.listPrice;
			newListing.member = relations["member"];
			newListing.category = relations["category"];
			newListing.brand = relations["brand"];
			newListing.pricingOption = relations["pricingOption"];
			newListing.status = 1;

			return await this.save(newListing);
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async updateExisting(
		id: string,
		data: UpdateListDto,
		relations: string[] = []
	): Promise<Listing> {
		try {
			const updateListing = await this.findOne({ id: id });
			if (!updateListing)
				throw new HttpException("Listing is not found", HttpStatus.NOT_FOUND);

			if (data.title) updateListing.title = data.title;
			if (data.description) updateListing.description = data.description;
			if (data.listType) updateListing.listType = data.listType;
			if (data.category) updateListing.category = relations["category"];
			if (data.brand) updateListing.brand = relations["brand"];

			await this.update({ id: id }, updateListing);
			return updateListing;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async deleteExisting(data: ListingIdDto): Promise<any> {
		try {
			let result = await this.softDelete({ id: data.listId });
			if (result.affected == 0) {
				throw new NotFoundException("Listing couldn't found");
			} else {
				await this.update({ id: data.listId }, { isDeleted: 1 });
				return { deleted: true };
			}
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
