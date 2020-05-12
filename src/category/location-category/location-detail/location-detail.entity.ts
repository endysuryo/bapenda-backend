import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../base.entity';
import uuid = require('uuid');
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Type } from 'class-transformer';
import { LocationCategory } from '../location-category.entity';
import { Billboard } from '../../../billboard/billboard.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('locationdetails')
export class LocationDetail extends BaseEntity {
  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  location_category_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  address: string;

  @ManyToOne(
    () => LocationCategory,
    locationcategory => locationcategory.locationdetails,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'location_category_id' })
  locationcategory: LocationCategory;

  @OneToMany(
    () => Billboard,
    billboard => billboard.location_detail,
  )
  @Type(() => Billboard)
  billboards: Billboard[];

  @BeforeInsert()
  protected beforeInsert(): void {
    this.id = uuid.v4();
  }
}
