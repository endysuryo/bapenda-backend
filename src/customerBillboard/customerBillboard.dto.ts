import { ApiModelProperty } from '@nestjs/swagger';
import { CustomerBillboard } from './customerBillboard.entity';

export class CentroidDto {
  @ApiModelProperty({ example: '2020-01-02' })
  start_date: string;

  @ApiModelProperty({ example: '2020-08-02' })
  end_date: string;

  @ApiModelProperty()
  cluster_1: CustomerBillboard;

  @ApiModelProperty()
  cluster_2: CustomerBillboard;

  @ApiModelProperty()
  cluster_3: CustomerBillboard;
}