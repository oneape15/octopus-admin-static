import { ApiBody, PageInfo } from './Global';
import request from '@/utils/request';
import { RoleItem, RoleParams, RoleRlSchemaItem } from './role.d';

const URI_PREFIX = '/api/role';

/**
 * Paging query role.
 * @param dsId 
 */
export async function queryRole(params: RoleParams) {
  return request<ApiBody<PageInfo<RoleItem[]>>>(
    `${URI_PREFIX}/list`, {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * Save role info.
 * @param params 
 */
export async function saveRole(params: RoleItem) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/save`, {
    data: { ...params },
    method: 'POST',
  })
}

/**
 * delete role info.
 * @param roleId 
 */
export async function delRole(roleId: number) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/del/${roleId}`, {
    method: 'POST',
  })
}

/**
 * Gets the specified role resource permission.
 * @param roleId 
 */
export async function getResByRoleId(roleId: number) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/permission/${roleId}`, {
    method: 'POST',
  })
}

/**
 * Get all role.
 */
export async function getAllRole() {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/all`, {
    method: 'GET',
  })
}

export async function saveSchemaPermission(params: { roleId: number, schemaInfos: RoleRlSchemaItem[] }) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/saveSchemaPermission`, {
    data: { ...params },
    method: 'POST',
  })
}
