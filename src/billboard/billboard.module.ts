import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillboardController } from './billboard.controller';
import { BillboardService } from './billboard.service';
import { Billboard } from './billboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billboard])],

  providers: [BillboardService],

  controllers: [BillboardController],
})
export class BillboardModule {}
