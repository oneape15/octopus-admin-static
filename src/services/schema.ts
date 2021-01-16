import { ApiBody } from './Global';
import request from '@/utils/request';
import { TableSchemaItem, TableColumnItem } from './schema.d';
/**
 * Pull data source Schema
 * @param dsId 
 */
export async function reloadDataSoure(dsId: number | string) {
  return request<ApiBody<string>>(
    `/api/schema/reloadDatabase/${dsId}`, {
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
    `/api/schema/reload/${dsId}/${tableName}`, {
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
    `/api/schema/fetchTableList/${dsId}`, {
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
    `/api/schema/fetchTableColumnList/${dsId}/${tableName}`, {
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
    '/api/schema/column/changeInfo', {
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
    '/api/schema/table/changeInfo', {
    data: {
      ...params
    },
    method: 'POST'
  }
  );
}