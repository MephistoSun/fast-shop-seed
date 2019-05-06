import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ActionEntity } from './action.entity';
import { UserEntity } from './user.entity';

@Entity({ schema: 'system' })
export class RoleEntity extends BaseEntity {
  @Column('nvarchar', { length: 100 })
  public name: string;

  @Column('nvarchar', { length: 100 })
  public code: string;

  @Column('nvarchar', { nullable: true, length: 500 })
  public comment: string | null;

  @ManyToMany(() => UserEntity)
  public users: UserEntity[];

  @JoinTable({
    schema: 'system',
    name: 'role_-action_mapping',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'action_id' },
  })
  @ManyToMany(() => ActionEntity)
  public actions: ActionEntity[];
}
