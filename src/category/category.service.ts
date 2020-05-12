import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class CategoryService extends TypeOrmCrudService<
  Category
> {
  constructor(@InjectRepository(Category) repo) {
    super(repo);
  }
}
