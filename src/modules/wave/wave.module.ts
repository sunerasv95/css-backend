import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaveRepository } from './wave.repository';
import { WaveService } from './wave.service';

@Module({
    imports: [TypeOrmModule.forFeature([WaveRepository])],
    providers: [WaveService]
})
export class WaveModule {}
