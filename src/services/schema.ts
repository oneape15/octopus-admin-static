import { ApiBody } from './Global';
import request from '@/utils/request';

export async function fetchTableList(dsId: number | string) {
  return request<ApiBody<API.TableSchemaItem[]>>(
    `/api/schema/fetchTableList/${dsId}`, {
    data: {},
    method: 'GET',
  })
}