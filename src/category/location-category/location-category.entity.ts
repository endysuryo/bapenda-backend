import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import uuid = require('uuid');
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Type } from 'class-transformer';
import { Category } from '../../category/category.entity';
import { LocationDetail } from './location-detail/location-detail.entity';
import { Billboard } from '../../billboard/billboard.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('locationcategories')
export class LocationCategory extends BaseEntity {
  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  category_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'int' })
  nsr: number;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'int' })
  tax: number;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  tax_period: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  information: string;

  @ManyToOne(
    () => Category,
    category => category.locationcategories,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
    () => LocationDetail,
    locationdetail => locationdetail.locationcategory,
  )
  @Type(() => LocationDetail)
  locationdetails: LocationDetail[];

  @OneToMany(
    () => Billboard,
    billboard => billboard.location_category,
  )
  @Type(() => Billboard)
  billboards: Billboard[];

  @BeforeInsert()
  protected beforeInsert(): void {
    this.id = uuid.v4();
  }
}
