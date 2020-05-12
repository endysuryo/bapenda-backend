import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Billboard } from './billboard.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class BillboardService extends TypeOrmCrudService<
  Billboard
> {
  constructor(@InjectRepository(Billboard) repo) {
    super(repo);
  }
}
