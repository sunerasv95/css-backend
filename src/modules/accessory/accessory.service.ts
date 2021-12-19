import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Accessory } from "./accessory.entity";
import { AccessoryRepository } from "./accessory.respository";

@Injectable()
export class AccessoryService {

    constructor(
        @InjectRepository(Accessory)
        private readonly accessoryRepository: AccessoryRepository
    ){}

    async findAccessoryById(id: number){
        const accessory = await this.accessoryRepository.findOne({ id});
        if(accessory) return accessory;
        throw new HttpException("Accessory details not found", HttpStatus.NOT_FOUND);
    }
}