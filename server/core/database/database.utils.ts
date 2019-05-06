import { snakeCase } from 'lodash';

export let getTableName = (targetName: string) => {
  let tableName = snakeCase(targetName.replace(/Entity/, ''));
  tableName.slice(-1) === 'y'
    ? (tableName = `${tableName.substring(0, tableName.length - 1)}ies`)
    : (tableName = `${tableName}s`);
  return tableName;
};
