import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationDetailController } from './location-detail.controller';
import { LocationDetailService } from './location-detail.service';
import { LocationDetail } from './location-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationDetail])],

  providers: [LocationDetailService],

  controllers: [LocationDetailController],
})
export class LocationDetailModule {}
