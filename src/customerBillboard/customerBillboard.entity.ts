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
import { Billboard } from '../billboard/billboard.entity';
import { SubDistrict } from '../subdistrict/subdistrict.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('customer_billboards')
export class CustomerBillboard extends BaseEntity {
  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  customer_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  billing_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  skpd_number: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  billboard_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  subdistrict_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'float' })
  billboard_weight: number;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'float' })
  billboard_total: number;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'float' })
  subdistrict_weight: number;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  user_id: string;

  @ManyToOne(
    () => User,
    user => user.customer_billboards,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Customer,
    customer => customer.customer_billboards,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(
    () => Billboard,
    billboard => billboard.customer_billboards,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'billboard_id' })
  billboard: Billboard;

  @ManyToOne(
    () => SubDistrict,
    subdistrict => subdistrict.customer_billboards,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'subdistrict_id' })
  subdistrict: SubDistrict;

  @BeforeInsert()
  protected beforeInsert(): void {
    this.id = uuid.v4();
  }
}
