import request from '@/utils/request';
import { ApiBody, PageInfo } from './Global';

export async function queryDataSource(params: API.DataSourceParams) {
  return request<ApiBody<PageInfo<API.DataSoureItem[]>>>('/api/ds/list', {
    data: { ...params },
    method: 'POST',
  })
}

export async function saveDataSource(params: API.DataSoureItem) {
  return request<ApiBody<string>>('/api/ds/save', {
    data: { ...params },
    method: 'POST',
  })
}

export async function testDataSource(params: API.DataSoureItem) {
  return request<ApiBody<string>>('/api/ds/test', {
    data: { ...params },
    method: 'POST',
  })
}

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

export async function delDataSoure(params: { id: number }) {
  return request<ApiBody<string>>(
    '/api/ds/del',
    {
      data: {
        ...params
      },
      method: 'POST'
    }
  );
}

/**
 * 获取支持的数据源类型
 */
export async function getAllDsTypes() {
  return request<ApiBody<API.DataSourceType[]>>(
    '/api/ds/getAllDsTypes',
    {
      method: 'GET',
    }
  );
}

export async function getAllDataSource() {
  return request<ApiBody<API.DataSoureItem[]>>(
    '/api/ds/getAllSimple',
    {
      method: 'GET'
    }
  );
}