import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDetail } from './location-detail.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class LocationDetailService extends TypeOrmCrudService<
  LocationDetail
> {
  constructor(@InjectRepository(LocationDetail) repo) {
    super(repo);
  }
}
