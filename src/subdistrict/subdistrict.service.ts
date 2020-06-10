import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubDistrict } from './subdistrict.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class SubDistrictService extends TypeOrmCrudService<
  SubDistrict
> {
  constructor(@InjectRepository(SubDistrict) repo) {
    super(repo);
  }
}
