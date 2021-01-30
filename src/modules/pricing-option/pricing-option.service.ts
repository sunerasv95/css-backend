import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePricingDto } from "./dto/create-pricing.dto";
import { PricingIdDto } from "./dto/pricing-id.dto";
import { UpdatePricingDto } from "./dto/update-pricing.dto";
import { PricingOption } from "./pricing-option.entity";
import { PricingOptionRepository } from "./pricing-option.repository";

@Injectable()
export class PricingOptionService {
	constructor(
		@InjectRepository(PricingOption)
		private readonly pricingOptRepository: PricingOptionRepository
	) {}

	async findAllPricingOpts(): Promise<PricingOption[]> {
		return await this.pricingOptRepository.find();
	}

	async findOnePricingOpt(pricingOpt: PricingIdDto): Promise<PricingOption> {
		const category = await this.pricingOptRepository.findOne(
			pricingOpt.optionId
		);
		if (!category) {
			throw new NotFoundException("Pricing option couldn't be found");
		}
		return category;
	}

	async createPricingOpt(
		pricingData: CreatePricingDto
	): Promise<PricingOption> {
		return await this.pricingOptRepository.createNew(pricingData);
	}

	async updatePricingOpt(
		id: PricingIdDto,
		updateData: UpdatePricingDto
	): Promise<PricingOption> {
		return await this.pricingOptRepository.updateExisting(id, updateData);
	}

	async deletePricingOpt(data: PricingIdDto): Promise<any> {
		return await this.pricingOptRepository.deleteExisting(data);
	}
}
