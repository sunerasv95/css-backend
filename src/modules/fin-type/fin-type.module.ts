import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinTypeRepository } from './fin-type.repository';
import { FinTypeService } from './fin-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([FinTypeRepository])],
    providers: [FinTypeService]
})
export class FinTypeModule {}
