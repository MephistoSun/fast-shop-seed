import { snakeCase } from 'lodash';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { getTableName } from '../database.utils';

export class DatabaseNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  public tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : getTableName(targetName);
  }

  public columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
  }
}
