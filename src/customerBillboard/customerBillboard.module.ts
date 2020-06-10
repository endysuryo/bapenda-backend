import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerBillboardController } from './customerBillboard.controller';
import { CustomerBillboardService } from './customerBillboard.service';
import { CustomerBillboard } from './customerBillboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerBillboard])],

  providers: [CustomerBillboardService],

  controllers: [CustomerBillboardController],
})
export class CustomerBillboardModule {}
