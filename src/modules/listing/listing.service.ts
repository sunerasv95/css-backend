import {
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryRepository } from "src/modules/category/category.repository";
import { getRepository } from "typeorm";
import { Brand } from "../brand/brand.entity";
import { Category } from "../category/category.entity";
import { Member } from "../member/member.entity";
import { MemberRepository } from "../member/member.repository";
import { CreateListDto } from "./dto/create-list.dto";
import { ListingIdDto } from "./dto/list-id.dto";
import { UpdateListDto } from "./dto/update-list.dto";

import { Listing } from "./listing.entity";
import { ListingRepository } from "./listing.repository";

@Injectable()
export class ListingService {
	constructor(
		@InjectRepository(Listing)
		private readonly listingRepository: ListingRepository,
		@InjectRepository(Category)
		private readonly categoryRepository: CategoryRepository,
		@InjectRepository(Brand)
		private readonly brandRepository: MemberRepository,
		@InjectRepository(Member)
		private readonly memberRepository: MemberRepository
	) {}

	async findAllCategories(): Promise<Listing[]> {
		return await this.listingRepository.find();
	}

	async findOneListing(id: string): Promise<Listing> {
		return await this.listingRepository.findOne(id);
	}

	async createListing(data: CreateListDto): Promise<Listing> {
		let relations = [];

		try {
			const member = await this.memberRepository.findOne({ id: data.member }); // member should retreive from the request/session
			relations["member"] = member;

			const category = await this.categoryRepository.findOne({
				id: data.category,
				isDeleted: 0,
			});
			if (!category)
				throw new HttpException("Category is not found", HttpStatus.NOT_FOUND);
			relations["category"] = category;

			const brand = await this.brandRepository.findOne({ id: data.brand });
			if (!brand)
				throw new HttpException("Brand is not found", HttpStatus.NOT_FOUND);
			relations["brand"] = brand;

			return await this.listingRepository.createNew(data, relations);
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async updateListing(id: string, data: UpdateListDto): Promise<Listing> {
		let updateRelations = [];

		if (data.category != null) {
			const category = await this.categoryRepository.findOne({
				id: data.category,
				isDeleted: 0,
			});
			if (!category)
				throw new HttpException("Category is not found", HttpStatus.NOT_FOUND);
			updateRelations["category"] = category;
		}

		if (data.brand != null) {
			const brand = await this.brandRepository.findOne({ id: data.brand });
			if (!brand)
				throw new HttpException("Brand is not found", HttpStatus.NOT_FOUND);
			updateRelations["brand"] = brand;
		}

		return await this.listingRepository.updateExisting(
			id,
			data,
			updateRelations
		);
	}

	async deleteListing(data: ListingIdDto): Promise<any> {
		return await this.listingRepository.deleteExisting(data);
	}
}
