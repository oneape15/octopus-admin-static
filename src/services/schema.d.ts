import { BaseItem, BaseQueryParams } from './Global';

export interface TableSchemaItem extends BaseItem {
  datasourceId: number;
  schemaName: string;
  name: string;
  alias?: string;
  view?: number;
  sync?: number;
  cron?: string;
  syncTime?: number;
  heat?: number;
  status?: number;
  comment?: string;
}


export interface TableColumnItem extends BaseItem {
  datasourceId: number;
  tableName: string;
  name: string;
  alias?: string;
  dataType?: string;
  classify?: number;
  heat?: number;
  status?: number;
  comment?: string;
}