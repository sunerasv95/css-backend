import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseFilters,
} from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";

import { Listing } from "./listing.entity";
import { ListingService } from "./listing.service";
import { ListingIdDto } from "./dto/list-id.dto";
import { GlobalExceptionFilter } from "src/common/filters/global-exception.filter";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";

@Controller("listings")
// @UseFilters(GlobalExceptionFilter)
export class ListingController {
	constructor(private readonly listingService: ListingService) {}

	@Get()
	async getAll(): Promise<Listing[]> {
		return await this.listingService.findAllListings();
	}

	@Get(":id")
	async getOne(@Param("id") id: number): Promise<Listing> {
		return await this.listingService.findListingById(id);
	}

	@Post()
	async create(@Body() reqData: CreateListDto): Promise<any> {
		return await this.listingService.createNewListing(reqData);
	}

	@Patch(":id")
	async update(
		@Param("id") id: number,
		@Body() data: UpdateListDto
	): Promise<boolean> {
		return await this.listingService.updateExistListing(id, data);
	}

	// @Delete(":id")
	// async delete(@Param("id") id: number): Promise<any> {
	// 	return await this.listingService.deleteExisting(id);
	// }
}
