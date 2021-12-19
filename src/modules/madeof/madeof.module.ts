import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MadeofRepository } from './madeof.repository';
import { MadeofService } from './madeof.service';

@Module({
  imports: [TypeOrmModule.forFeature([MadeofRepository])],
  providers: [MadeofService]
})
export class MadeofModule {}
