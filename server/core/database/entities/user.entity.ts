import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { RoleEntity } from './role.entity';
import { UserProviderEntity } from './user-provider.entity';

@Entity({ schema: 'system' })
export class UserEntity extends BaseEntity {
  @Column('varchar', { length: 100, nullable: true })
  public username: string;

  @Column('varchar', { length: 100, nullable: true, select: false })
  public password: string;

  @Column('varchar', { length: 100, nullable: true })
  public email: string;

  @Column('bit', { default: false })
  public emailConfirmed: boolean;

  @Column('varchar', { length: 100, nullable: true })
  public telephone: string;

  @Column('bit', { default: false })
  public telephoneConfirmed: boolean;

  @Column('bit', { default: false })
  public isLocked: boolean;

  @Column('nvarchar', { nullable: true, length: 500 })
  public comment: string;

  @OneToMany(() => UserProviderEntity, (userProvider) => userProvider.userId)
  public userProviders: UserProviderEntity[];

  @JoinTable({
    schema: 'system',
    name: 'user_role_mapping',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  @ManyToMany(() => RoleEntity)
  public roles: RoleEntity[];
}
