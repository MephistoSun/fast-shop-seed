import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs';
import { CoreModule } from './core/core.module';

const modules = [TypeOrmModule.forRoot(DatabaseConfig), CoreModule];

@Module({
  imports: [...modules],
})
export class AppModule {}
