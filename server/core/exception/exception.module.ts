import { Module } from '@nestjs/common';
import { ErrorExceptionFilter, HttpExceptionFilter } from './filters';

const providers = [ErrorExceptionFilter, HttpExceptionFilter];

@Module({
  providers,
  exports: [...providers],
})
export class ExceptionModule {}
