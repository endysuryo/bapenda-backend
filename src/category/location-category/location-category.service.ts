import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationCategory } from './location-category.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class LocationCategoryService extends TypeOrmCrudService<
  LocationCategory
> {
  constructor(@InjectRepository(LocationCategory) repo) {
    super(repo);
  }
}
