import { ApiBody, TreeItem } from './Global.d';
import request from '@/utils/request';
import { OrgItem, OrgTreeParams } from './org.d';

const URI_PREFIX = '/api/org';

/**
 * Save org info.
 * @param params 
 */
export async function saveOrg(params: OrgItem) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/save`, {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * get org by id
 * @param id 
 */
export async function getOrg(id: number | string) {
  return request<ApiBody<OrgItem>>(
    `${URI_PREFIX}/get/${id}`, {
    method: 'GET',
  })
}

/**
 * delete org info.
 * @param roleId 
 */
export async function delOrg(orgId: string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/del/${orgId}`, {
    method: 'POST',
  })
}

/**
 * Building a org tree.
 * @param params 
 */
export async function genOrgTree(params: OrgTreeParams) {
  return request<ApiBody<TreeItem[]>>(
    `${URI_PREFIX}/tree`, {
    method: 'POST',
    data: {
      ...params,
    }
  })
}