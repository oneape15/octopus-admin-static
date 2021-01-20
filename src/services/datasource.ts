import request from '@/utils/request';
import { ApiBody, PageInfo } from './Global.d';
import { DataSourceType, DataSoureItem, DataSourceParams } from './datasource.d';

const URI_PREFIX = '/api/ds';

/**
 * Paging the list.
 * @param params 
 */
export async function queryDataSource(params: DataSourceParams) {
  return request<ApiBody<PageInfo<DataSoureItem[]>>>(
    `${URI_PREFIX}/list`, {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * Data source save.
 * @param params 
 */
export async function saveDataSource(params: DataSoureItem) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/save`, {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * Test whether the data source is available.
 * @param params 
 */
export async function testDataSource(params: DataSoureItem) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/test`, {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * Data source status change.
 * @param params 
 */
export async function changeDataSourceStatus(params: { id: number, status: number }) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/changeStatus`,
    {
      data: {
        ...params
      },
      method: 'POST'
    }
  );
}

/**
 * Sync dataSource schema.
 * @param params 
 */
export async function syncSchema(params: { id: number }) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/syncSchema`,
    {
      data: {
        ...params
      },
      method: 'POST'
    }
  );
}
/**
 * Data source deleted.
 * @param params 
 */
export async function delDataSoure(id: number) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/del/${id}`,
    {
      data: {},
      method: 'POST'
    }
  );
}

/**
 * Gets the supported data source type.
 */
export async function getAllDsTypes() {
  return request<ApiBody<DataSourceType[]>>(
    `${URI_PREFIX}/getAllDsTypes`,
    {
      method: 'GET',
    }
  );
}

/**
 * Take all available data sources.
 */
export async function getAllDataSource() {
  return request<ApiBody<DataSoureItem[]>>(
    `${URI_PREFIX}/getAllSimple`,
    {
      method: 'GET'
    }
  );
}