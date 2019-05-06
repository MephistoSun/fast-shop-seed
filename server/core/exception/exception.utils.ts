import { HttpException } from '@nestjs/common';
import { createResult, IResponse } from '../shared';
import { HTTP_STATUS_CODE_ENUM } from './enums/http-status-code.enum';
import { CustomException } from './exceptions';

export const handleException = (error: Error | HttpException, response: IResponse): void => {
  let status = HTTP_STATUS_CODE_ENUM.INTERNAL_SERVER_ERROR;
  let code = HTTP_STATUS_CODE_ENUM.INTERNAL_SERVER_ERROR;
  if (error instanceof CustomException) {
    status = HTTP_STATUS_CODE_ENUM.BAD_REQUEST;
    code = error.getStatus();
  } else if (error instanceof HttpException) {
    status = code = error.getStatus();
  }
  response.status(status).send(createResult(error, code));
};
