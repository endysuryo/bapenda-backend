import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import uuid = require('uuid');
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Type } from 'class-transformer';
import { User } from '../user/user.entity';
import { Customer } from '../customer/customer.entity';
import { CustomerBillboard } from '../customerBillboard/customerBillboard.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('subdistricts')
export class SubDistrict extends BaseEntity {
  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  name: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'float' })
  weight: number;

  @OneToMany(
    () => CustomerBillboard,
    customer_billboard => customer_billboard.subdistrict,
  )
  @Type(() => CustomerBillboard)
  customer_billboards: CustomerBillboard[];

  @BeforeInsert()
  protected beforeInsert(): void {
    this.id = uuid.v4();
  }
}
