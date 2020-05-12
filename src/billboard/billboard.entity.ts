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

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('users')
export class Billboard extends BaseEntity {
  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  customer_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  location_category_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  location_detail_id: string;

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
  type: string;

  @ApiModelPropertyOptional( { example: new Date() })
  @IsOptional({ always: true })
  @Column({ type: 'timestamp', nullable: true })
  start_at: Date;

  @ApiModelPropertyOptional( { example: new Date() })
  @IsOptional({ always: true })
  @Column({ type: 'timestamp', nullable: true })
  end_at: Date;

  @ApiModelPropertyOptional( { example: new Date() })
  @IsOptional({ always: true })
  @Column({ type: 'timestamp', nullable: true })
  approve_at: Date;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'float' })
  size: number;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'int' })
  amount: number;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  user_id: string;

  @ManyToOne(
    () => User,
    user => user.billboards,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  protected beforeInsert(): void {
    this.id = uuid.v4();
  }
}
