import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinType } from './fin-type.entity';
import { FinTypeRepository } from './fin-type.repository';

@Injectable()
export class FinTypeService {

    constructor(
        @InjectRepository(FinType)
        private readonly finTypeRepository: FinTypeRepository
    ){}

    async getAllFinTypes(){
        return await this.finTypeRepository.find();
    }

    async findFinTypeById(id: number) {
        const finType = await this.finTypeRepository.findOne({ id });
        if(finType){
            return finType;
        }
        throw new HttpException("Fin type is not exists!", HttpStatus.NOT_FOUND);
    }
}
