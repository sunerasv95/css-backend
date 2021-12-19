import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Madeof } from './madeof.entity';
import { MadeofRepository } from './madeof.repository';

@Injectable()
export class MadeofService {
    constructor(
        @InjectRepository(Madeof)
        private readonly madeofRepository: MadeofRepository
    ){}

    async getAllMadeofs(){
        return await this.madeofRepository.find();
    }

    async findMadeofById(id: number) {
        const madeof = await this.madeofRepository.findOne({ id });
        if(madeof){
            return madeof;
        }
        throw new HttpException("Material type is not exist!", HttpStatus.NOT_FOUND);
    }
}
