import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreatePricingDto } from "./dto/create-pricing.dto";
import { PricingIdDto } from "./dto/pricing-id.dto";
import { UpdatePricingDto } from "./dto/update-pricing.dto";

import { PricingOption } from "./pricing-option.entity";

@EntityRepository(PricingOption)
export class PricingOptionRepository extends Repository<PricingOption> {
    async createNew(pricingOptData: CreatePricingDto): Promise<PricingOption> {
        try {
          const newPricingOpt = new PricingOption();
    
          newPricingOpt.pricingOption = pricingOptData.pricingOptName;
          newPricingOpt.isDeleted = 0;
    
          return await this.save(newPricingOpt);
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
      }
    
      async updateExisting(pricingOpt: PricingIdDto, updateData: UpdatePricingDto): Promise<PricingOption> {
        try {
          const updatePricingOpt = await this.findOne(pricingOpt.optionId);
          if (!updatePricingOpt) {
            throw new NotFoundException("Pricing option couldn't be found");
          }
    
          if (updateData.pricingOptName) updatePricingOpt.pricingOption = updateData.pricingOptName;    
          await this.update({ id: pricingOpt.optionId }, updatePricingOpt);
          
          return updatePricingOpt;
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
      }
    
      async deleteExisting(data: PricingIdDto): Promise<any> {
        try {
          let result = await this.softDelete({ id: data.optionId });
    
          if (result.affected == 0) {
            throw new NotFoundException("Pricing option couldn't be found");
          } else {
            await this.update({ id: data.optionId }, { isDeleted: 1 });
            return { deleted: true };
          }
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
      }
}