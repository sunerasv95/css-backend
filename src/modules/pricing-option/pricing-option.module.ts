import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PricingOptionController } from "./pricing-option.controller";
import { PricingOptionRepository } from "./pricing-option.repository";
import { PricingOptionService } from "./pricing-option.service";

@Module({
	imports: [TypeOrmModule.forFeature([PricingOptionRepository])],
	controllers: [PricingOptionController],
	providers: [PricingOptionService],
})
export class PricingOptionModule {}
