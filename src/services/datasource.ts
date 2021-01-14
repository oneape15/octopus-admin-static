import request from '@/utils/request';
import { ApiBody, PageInfo } from './Global.d';
import { DataSourceType, DataSoureItem, DataSourceParams } from './datasource.d';

/**
 * Paging the list.
 * @param params 
 */
export async function queryDataSource(params: DataSourceParams) {
  return request<ApiBody<PageInfo<DataSoureItem[]>>>('/api/ds/list', {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * Data source save.
 * @param params 
 */
export async function saveDataSource(params: DataSoureItem) {
  return request<ApiBody<string>>('/api/ds/save', {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * Test whether the data source is available.
 * @param params 
 */
export async function testDataSource(params: DataSoureItem) {
  return request<ApiBody<string>>('/api/ds/test', {
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
    '/api/ds/changeStatus',
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
    '/api/ds/syncSchema',
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
    `/api/ds/del/${id}`,
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
    '/api/ds/getAllDsTypes',
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
    '/api/ds/getAllSimple',
    {
      method: 'GET'
    }
  );
}