import { HttpException } from '@nestjs/common';
import _ from 'lodash';
import { HTTP_STATUS_CODE_ENUM } from '../exception/enums';
import { Logger } from '../logger';
import { ENVIRONMENT_ENUM } from './enums';
import { IResult } from './interfaces';

export const getEnvironment = () => {
  const environment = process.env.ENVIRONMENT;
  if (!environment) {
    throw new Error('no global environment ENVIRONMENT provider!');
  } else {
    return environment;
  }
};

export const isLocal = () => getEnvironment() === ENVIRONMENT_ENUM.LOCAL;

export const isDevelopment = () => getEnvironment() === ENVIRONMENT_ENUM.DEVELOP;

export const isProduction = () => getEnvironment() === ENVIRONMENT_ENUM.PRODUCT;

export function createResult(error?: Error | HttpException): IResult;
export function createResult(error?: Error | HttpException, code?: number): IResult;
export function createResult(data?: any): IResult;
export function createResult(data?: any, code?: number): IResult;
export function createResult(
  dataOrError: any = {},
  code: number = HTTP_STATUS_CODE_ENUM.OK,
): IResult {
  let data: any = {};
  const message = '';
  if (dataOrError instanceof HttpException) {
    code = dataOrError.getStatus();
    Logger.error(dataOrError.message, dataOrError.stack, 'HttpException');
  } else if (dataOrError instanceof Error) {
    code = HTTP_STATUS_CODE_ENUM.INTERNAL_SERVER_ERROR;
    Logger.error(dataOrError.message, dataOrError.stack, 'UncaughtException');
  } else {
    data = dataOrError;
  }
  const result: IResult = { data, code, message };
  return result;
}
