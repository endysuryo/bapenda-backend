import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubDistrictController } from './subdistrict.controller';
import { SubDistrictService } from './subdistrict.service';
import { SubDistrict } from './subdistrict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubDistrict])],

  providers: [SubDistrictService],

  controllers: [SubDistrictController],
})
export class SubDistrictModule {}
