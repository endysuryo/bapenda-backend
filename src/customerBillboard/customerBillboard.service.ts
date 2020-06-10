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
      const tempCluster = [];

      for (const dataCluster of fetchAllData) {
        const clusterValue1 = Math.sqrt(
          Math.pow((dataCluster.subdistrict_weight - centroidData.cluster_1.subdistrict_weight), 2)
          + Math.pow((dataCluster.billboard_total - centroidData.cluster_1.billboard_total), 2)
          + Math.pow((dataCluster.billboard_weight - centroidData.cluster_1.billboard_weight), 2),
        );
        const clusterValue2 = Math.sqrt(
          Math.pow((dataCluster.subdistrict_weight - centroidData.cluster_2.subdistrict_weight), 2)
          + Math.pow((dataCluster.billboard_total - centroidData.cluster_2.billboard_total), 2)
          + Math.pow((dataCluster.billboard_weight - centroidData.cluster_2.billboard_weight), 2),
        );
        const clusterValue3 = Math.sqrt(
          Math.pow((dataCluster.subdistrict_weight - centroidData.cluster_3.subdistrict_weight), 2)
          + Math.pow((dataCluster.billboard_total - centroidData.cluster_3.billboard_total), 2)
          + Math.pow((dataCluster.billboard_weight - centroidData.cluster_3.billboard_weight), 2),
        );

        const compareValue = Math.min(clusterValue1, clusterValue2, clusterValue3);

        let numberOfCluster = 0;

        if (compareValue === clusterValue1) {
          numberOfCluster = 1;
        } else if (compareValue === clusterValue2) {
          numberOfCluster = 2;
        } else {
          numberOfCluster = 3;
        }

        const fisrtStepCluster = {
          ...dataCluster,
          data_cluster1: clusterValue1,
          data_cluster2: clusterValue2,
          data_cluster3: clusterValue3,
          minimum_cluster: numberOfCluster,
        };

        tempCluster.push(fisrtStepCluster);
      }

      // define new centroid

      return tempCluster;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
