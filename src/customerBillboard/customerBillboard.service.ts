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

  async generateAllKmeans(dto: any): Promise<any> {
    try {
      const fetchAllData = await this.repo
      .createQueryBuilder('customerBillboard')
      .getMany();

      const centroidData = dto;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // async kMeans(dtoKmeans) {
  //   const kmeansValue =  Math.sqrt();
  // }
}
