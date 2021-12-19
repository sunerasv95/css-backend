import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessoryRepository } from './accessory.respository';
import { AccessoryService } from './accessory.service';

@Module({
    imports: [TypeOrmModule.forFeature([AccessoryRepository])],
    providers: [AccessoryService]
})
export class AccessoryModule {}
