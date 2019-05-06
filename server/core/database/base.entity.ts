import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { UserEntity } from './entities';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int', { nullable: true })
  public createUserId: number;

  @Column('datetime2', { nullable: true })
  public createDate: Date;

  @Column('int', { nullable: true })
  public modifiedUserId: number;

  @Column('datetime2', { nullable: true })
  public modifiedDate: Date;

  @Column('bit', { default: false })
  public isDeleted: boolean;

  @VersionColumn({ nullable: true })
  public version: number;

  @JoinColumn({ name: 'create_user_id' })
  @ManyToOne(() => UserEntity)
  public createUser: UserEntity;

  @JoinColumn({ name: 'modified_user_id' })
  @ManyToOne(() => UserEntity)
  public modifiedUser: UserEntity;
}
