import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { PricingIdDto } from './dto/pricing-id.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { PricingOption } from './pricing-option.entity';
import { PricingOptionService } from './pricing-option.service';

@Controller('pricing-options')
export class PricingOptionController {
    constructor(private readonly pricingOptService: PricingOptionService) {}

	@Get()
	async getAll(): Promise<PricingOption[]> {
		return await this.pricingOptService.findAllPricingOpts();
	}

	@Get(":id")
	async getOne(@Param("id") id: PricingIdDto): Promise<PricingOption> {
		return await this.pricingOptService.findOnePricingOpt(id);
	}

	@Post()
	async create(@Body() pricingOptData: CreatePricingDto): Promise<PricingOption> {
		return await this.pricingOptService.createPricingOpt(pricingOptData);
	}

	@Patch(":id")
	async update(
		@Param("id") id: PricingIdDto,
		@Body() updateData: UpdatePricingDto
	): Promise<PricingOption> {
		return await this.pricingOptService.updatePricingOpt(id, updateData);
	}

	@Delete()
	async delete(@Body() data: PricingIdDto): Promise<any> {
		return await this.pricingOptService.deletePricingOpt(data);
	}
}
