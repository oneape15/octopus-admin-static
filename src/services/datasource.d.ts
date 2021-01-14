import { BaseItem, BaseQueryParams } from './Global.d';

/**
 * 数据源对象
 */
export interface DataSoureItem extends BaseItem {
  name: string;
  type: string;
  status: number;
  jdbcUrl: string;
  jdbcDriver?: string;
  username: string;
  password?: string;
  sync?: number;
  cron?: string;
  timeout?: number;
  maxPoolSize?: number;
  minIdle?: number;
  readOnly?: number;
  canDdl?: number;
  testSql?: string;
  comment?: string;
}

export interface DataSourceParams extends BaseQueryParams {
  name?: string;
}

export interface DataSourceType {
  type: string;
  driver: string;
}