import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { ExceptionModule } from './exception';

const modules = [ExceptionModule, DatabaseModule];

@Module({
  imports: [...modules],
})
export class CoreModule {}
