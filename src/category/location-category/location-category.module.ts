import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationCategoryController } from './location-category.controller';
import { LocationCategoryService } from './location-category.service';
import { LocationCategory } from './location-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationCategory])],

  providers: [LocationCategoryService],

  controllers: [LocationCategoryController],
})
export class LocationCategoryModule {}
