import { ApiBody } from './Global.d';
import request from '@/utils/request';
import { TableSchemaItem, TableColumnItem } from './schema.d';

const URI_PREFIX = '/api/schema';

/**
 * Pull data source Schema
 * @param dsId 
 */
export async function reloadDataSoure(dsId: number | string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/reloadDatabase/${dsId}`, {
    data: {},
    method: 'GET',
  });
}
/**
 * Pull table Schema.
 * @param dsId 
 * @param tableName 
 */
export async function reloadTableInfo(dsId: number | string, tableName: string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/reload/${dsId}/${tableName}`, {
    data: {},
    method: 'GET',
  });
}
/**
 * fetch table list
 * @param dsId 
 */
export async function fetchTableList(dsId: number | string) {
  return request<ApiBody<TableSchemaItem[]>>(
    `${URI_PREFIX}/fetchTableList/${dsId}`, {
    data: {},
    method: 'GET',
  });
}

/**
 * fetch column list
 * @param dsId 
 * @param tableName 
 */
export async function fetchColumnList(dsId: number | string, tableName: string) {
  return request<ApiBody<TableColumnItem[]>>(
    `${URI_PREFIX}/fetchTableColumnList/${dsId}/${tableName}`, {
    data: {},
    method: 'GET'
  }
  );
}

/**
 * Modify the table field information.
 * @param params 
 */
export async function changeColumnInfo(params: {
  id: number | string,
  dataType?: string,
  alias?: string,
  comment?: string
}) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/column/changeInfo`, {
    data: {
      ...params
    },
    method: 'POST'
  }
  );
}

/**
 * Modify the table information.
 * @param params 
 */
export async function changeTableInfo(params: {
  id: number | string,
  sync?: number,
  cron?: string,
  alias?: string,
  comment?: string
}) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/table/changeInfo`, {
    data: {
      ...params
    },
    method: 'POST'
  }
  );
}