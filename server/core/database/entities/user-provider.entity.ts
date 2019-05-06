import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserEntity } from './user.entity';

@Entity({ schema: 'system' })
export class UserProviderEntity extends BaseEntity {
  @Column('nvarchar', { length: 100 })
  public type: string;

  @Column('nvarchar', { length: 100 })
  public key: string;

  @Column('int', { nullable: true })
  public userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserEntity)
  public user: UserEntity | null;
}
