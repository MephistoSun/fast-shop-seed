import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity, RoleEntity, UserEntity, UserProviderEntity } from './entities';

const entities = [UserEntity, RoleEntity, ActionEntity, UserProviderEntity];
const modules = [TypeOrmModule.forFeature(entities)];

@Global()
@Module({
  imports: [...modules],
})
export class DatabaseModule {}
