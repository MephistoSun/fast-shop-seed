import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class ToNumberPipe implements PipeTransform<string> {
  constructor(private readonly required: boolean = false) {}

  public async transform(value?: string): Promise<number | undefined> {
    if ((this.required && !value) || (!this.required && value && _.isNaN(_.toNumber(value)))) {
      throw new BadRequestException(`number ${value} is invalid for to number pipe!`);
    }
    if (_.isEmpty(value)) {
      return undefined;
    }
    return _.toNumber(value);
  }
}
