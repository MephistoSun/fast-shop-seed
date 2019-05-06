import _ from 'lodash';
import path from 'path';

interface ILodashMixin extends _.LoDashStatic {
  toBoolean(value: any): boolean;
  getRootPath(): string;
  getPath(...paths: string[]): string;
}

const lodashMixin = {
  toBoolean(value: any): boolean {
    if (_.isString(value)) {
      return value === 'true' ? true : false;
    } else {
      return !!value;
    }
  },
  getRootPath(): string {
    return process.cwd();
  },
  getPath(...paths: string[]): string {
    return path.resolve(this.getRootPath(), ...paths);
  },
};

_.mixin(lodashMixin);

const utils: ILodashMixin = _ as ILodashMixin;

export default utils;
