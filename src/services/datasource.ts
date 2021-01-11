import request from '@/utils/request';

export async function queryDataSource(params: API.DataSourceParams) {
  return request<API.MsgBody<API.PageInfo<API.DataSoureItem>>>('/api/ds/list', {
    data: { ...params },
    method: 'POST',
  })
}

export async function saveDataSource(params: API.DataSoureItem) {
  return request<API.MsgBody<string>>('/api/ds/save', {
    data: { ...params },
    method: 'POST',
  })
}

export async function changeDataSourceStatus(params: { id: number, status: number }) {
  return request<API.MsgBody<string>>(
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
  return request<API.MsgBody<string>>(
    '/api/ds/syncSchema',
    {
      data: {
        ...params
      },
      method: 'POST'
    }
  );
}