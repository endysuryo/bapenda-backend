import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerBillboard } from './customerBillboard.entity';
import { getConnection, Between } from 'typeorm';

@Injectable()
export class CustomerBillboardService extends TypeOrmCrudService<
  CustomerBillboard
> {
  constructor(@InjectRepository(CustomerBillboard) repo) {
    super(repo);
  }

  async getByDate(dto: any): Promise<any> {
    try {
      const dataDto: any = dto;
      const getByDate = await this.repo
        .createQueryBuilder('customerBillboard')
        .select('customerBillboard.id', 'id')
        .addSelect('customerBillboard.subdistrict_weight', 'subdistrict_weight')
        .addSelect('customerBillboard.billboard_weight', 'billboard_weight')
        .addSelect('SUM(customerBillboard.billboard_total)', 'billboard_total')
        .where('customerBillboard.created_at >= :start_at', { start_at: dto.start_date })
        .andWhere('customerBillboard.created_at <= :end_at', { end_at: dto.end_date })
        .leftJoinAndSelect('customerBillboard.customer', 'customer')
        .leftJoinAndSelect('customerBillboard.billboard', 'billboard')
        .leftJoinAndSelect('customerBillboard.subdistrict', 'subdistrict')
        .groupBy('customerBillboard.subdistrict_id')
        .addGroupBy('customerBillboard.billboard_weight')
        .getRawMany();

      return getByDate;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async generateAllKmeans(dto: any): Promise<any> {
    try {
      const fetchAllData = await this.repo
        .createQueryBuilder('customerBillboard')
        .select('customerBillboard.id', 'id')
        .addSelect('customerBillboard.subdistrict_weight', 'subdistrict_weight')
        .addSelect('customerBillboard.billboard_weight', 'billboard_weight')
        .addSelect('SUM(customerBillboard.billboard_total)', 'billboard_total')
        .where('customerBillboard.created_at >= :start_at', { start_at: dto.start_date })
        .andWhere('customerBillboard.created_at <= :end_at', { end_at: dto.end_date })
        .leftJoinAndSelect('customerBillboard.customer', 'customer')
        .leftJoinAndSelect('customerBillboard.billboard', 'billboard')
        .leftJoinAndSelect('customerBillboard.subdistrict', 'subdistrict')
        .groupBy('customerBillboard.subdistrict_id')
        .addGroupBy('customerBillboard.billboard_weight')
        .getRawMany();

      const centroidData = dto;

      // math from centroidData
      const defineFirstCluster = await this.mathCluster(fetchAllData, centroidData);
      // define new centroid
      const newCentroid =  await this.createNewCentroid(defineFirstCluster);
      // math from newCentroid
      const defineSecondCluster = await this.mathCluster(fetchAllData, newCentroid);

      // compare cluster
      const clusterCheck = await this.clusterCheck(defineFirstCluster, defineSecondCluster);

      if (clusterCheck === true) {
        return defineSecondCluster;
      }

      console.info('check : ', clusterCheck);

      let tempPrimaryCluster = defineSecondCluster;
      let tempCentroid: any;
      let tempSecondaryCluster: any;
      let returnCheck: boolean;

      // do this if return false
      do {
        console.info('loop start');
        tempCentroid = await this.createNewCentroid(tempPrimaryCluster);
        tempSecondaryCluster = await this.mathCluster(fetchAllData, tempCentroid);
        const doCluserCheck =  await this.clusterCheck(tempPrimaryCluster, tempSecondaryCluster);
        returnCheck = doCluserCheck;
        if (returnCheck === false) {
          console.info('will loop again');
          tempPrimaryCluster = [];
          tempPrimaryCluster = tempSecondaryCluster;
        } else {
          console.info('will stop loop');
          return tempSecondaryCluster;
        }
        console.info('hasil do : ', returnCheck);
      } while (!returnCheck);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async createNewCentroid(dto: any): Promise<any> {
    const tempCluster = dto;

    const arrayFilter1 = [];
    const arrayFilter2 = [];
    const arrayFilter3 = [];

    for (const filterCluster of tempCluster) {
      if (filterCluster.minimum_cluster === 1) {
        arrayFilter1.push(filterCluster);
      } else if (filterCluster.minimum_cluster === 2) {
        arrayFilter2.push(filterCluster);
      } else if (filterCluster.minimum_cluster === 3) {
        arrayFilter3.push(filterCluster);
      }
    }

    const cluster1 = {
      subdistrict_weight: 0,
      billboard_total: 0,
      billboard_weight: 0,
    };
    const cluster2 = {
      subdistrict_weight: 0,
      billboard_total: 0,
      billboard_weight: 0,
    };
    const cluster3 = {
      subdistrict_weight: 0,
      billboard_total: 0,
      billboard_weight: 0,
    };

    for (const firstCluster of arrayFilter1) {
      cluster1.subdistrict_weight = cluster1.subdistrict_weight + firstCluster.subdistrict_weight;
      cluster1.billboard_total = cluster1.billboard_total + firstCluster.billboard_total;
      cluster1.billboard_weight = cluster1.billboard_weight + firstCluster.billboard_weight;
    }

    cluster1.subdistrict_weight = cluster1.subdistrict_weight / arrayFilter1.length;
    cluster1.billboard_total = cluster1.billboard_total / arrayFilter1.length;
    cluster1.billboard_weight = cluster1.billboard_weight / arrayFilter1.length;

    for (const secondCluster of arrayFilter2) {
      cluster2.subdistrict_weight = cluster2.subdistrict_weight + secondCluster.subdistrict_weight;
      cluster2.billboard_total = cluster2.billboard_total + secondCluster.billboard_total;
      cluster2.billboard_weight = cluster2.billboard_weight + secondCluster.billboard_weight;
    }

    cluster2.subdistrict_weight = cluster2.subdistrict_weight / arrayFilter2.length;
    cluster2.billboard_total = cluster2.billboard_total / arrayFilter2.length;
    cluster2.billboard_weight = cluster2.billboard_weight / arrayFilter2.length;

    for (const thirdCluster of arrayFilter3) {
      cluster3.subdistrict_weight = cluster3.subdistrict_weight + thirdCluster.subdistrict_weight;
      cluster3.billboard_total = cluster3.billboard_total + thirdCluster.billboard_total;
      cluster3.billboard_weight = cluster3.billboard_weight + thirdCluster.billboard_weight;
    }

    cluster3.subdistrict_weight = cluster3.subdistrict_weight / arrayFilter3.length;
    cluster3.billboard_total = cluster3.billboard_total / arrayFilter3.length;
    cluster3.billboard_weight = cluster3.billboard_weight / arrayFilter3.length;

    const clusterResult = {
      cluster_1: cluster1,
      cluster_2: cluster2,
      cluster_3: cluster3,
    };

    return clusterResult;
  }

  async mathCluster(dtoData: any, dtoCentroid: any) {
    const sqlData: any = dtoData;
    const centroidData: any = dtoCentroid;
    const resClusterData: any = [];

    for (const dataCluster of sqlData) {
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

      const secondStepCluster = {
        ...dataCluster,
        data_cluster1: clusterValue1,
        data_cluster2: clusterValue2,
        data_cluster3: clusterValue3,
        minimum_cluster: numberOfCluster,
      };

      resClusterData.push(secondStepCluster);
    }

    return resClusterData;

  }

  async clusterCheck(dtoFirstCluster: any, dtoSecondCluster: any): Promise<boolean> {
    let returnValue: boolean;
    for (const firstCluster of dtoFirstCluster) {
      const secondCluster = dtoSecondCluster.find(el => el.id === firstCluster.id);
      if (firstCluster.minimum_cluster === secondCluster.minimum_cluster) {
        returnValue = true;
        console.info('comparing : ', true);
      } else {
        returnValue = false;
        console.info('comparing: ', false);
        return returnValue;
      }
    }
    return returnValue;
  }
}
