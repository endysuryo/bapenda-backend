import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class CustomerService extends TypeOrmCrudService<
  Customer
> {
  constructor(@InjectRepository(Customer) repo) {
    super(repo);
  }
}
