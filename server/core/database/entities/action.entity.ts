import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ schema: 'system' })
export class ActionEntity extends BaseEntity {
  @Column('nvarchar', { length: 100 })
  public name: string;

  @Column('nvarchar', { length: 100 })
  public code: string;

  @Column('nvarchar', { length: 100 })
  public method: string;

  @Column('nvarchar', { length: 100 })
  public path: string;

  @Column('nvarchar', { nullable: true, length: 500 })
  public comment: string;
}
