import { ApiBody, PageInfo } from './Global';
import request from '@/utils/request';
import { ResourceItem, ResourceParams } from './resource.d';

const URI_PREFIX = '/api/res';

/**
 * Save resource info.
 * @param params 
 */
export async function saveResource(params: ResourceItem) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/save`, {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * delete resource info.
 * @param roleId 
 */
export async function delResource(resId: number) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/del/${resId}`, {
    method: 'POST',
  })
}