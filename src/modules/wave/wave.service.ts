import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wave } from './wave.entity';
import { WaveRepository } from './wave.repository';

@Injectable()
export class WaveService {
    constructor(
        @InjectRepository(Wave)
        private readonly waveRepository: WaveRepository
    ){}

    async getAllWaves(){
        return await this.waveRepository.find();
    }

    async findWaveById(id: number){
        const wave = await this.waveRepository.findOne({ id });
        if(wave){
            return wave;
        }   
        throw new HttpException("Wave type is not exist!", HttpStatus.NOT_FOUND); 
    }
}
