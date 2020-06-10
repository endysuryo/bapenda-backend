import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerBillboard } from './customerBillboard.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class CustomerBillboardService extends TypeOrmCrudService<
  CustomerBillboard
> {
  constructor(@InjectRepository(CustomerBillboard) repo) {
    super(repo);
  }
}
