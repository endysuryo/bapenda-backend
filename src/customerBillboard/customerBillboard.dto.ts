import { ApiModelProperty } from '@nestjs/swagger';
import { CustomerBillboard } from './customerBillboard.entity';

export class CentroidDto {
  @ApiModelProperty()
  cluster_1: CustomerBillboard;

  @ApiModelProperty()
  cluster_2: CustomerBillboard;

  @ApiModelProperty()
  cluster_3: CustomerBillboard;
}