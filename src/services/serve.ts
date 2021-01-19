import request from '@/utils/request';
import { ApiBody, PageInfo, TreeItem } from './Global.d';
import { ServeItem, ServeGroupItem, ServeListParams, ServeGroupTreeParams } from './serve.d';

const URI_PREFIX = '/api/serve';
/**
 * Save serve information.
 * @param params 
 */
export async function saveServe(params: ServeItem) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * Deleted serve information.
 * @param serveId 
 */
export async function delServe(serveId: number | string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/del/${serveId}`, {
    method: 'POST'
  })
}

/**
 * Copy a new service with the specified service as the template.
 * @param params 
 */
export async function copServe(params: { serveId: number | string, name: string, code: string }) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/copy/${params.serveId}`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}

/**
 * Copy a brand new service to the template according to the specified version.
 * @param verCode 
 * @param params 
 */
export async function copServeWithVersion(verCode: string, params: { serveId: number | string, name: string, code: string }) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/copy/${params.serveId}/${verCode}`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}

/**
 * Paging query serve information.
 * @param params 
 */
export async function queryServe(params?: ServeListParams) {
  return request<ApiBody<PageInfo<ServeItem[]>>>(
    `${URI_PREFIX}/list`, {
    method: 'POST',
    data: { ...params },
  })
}

/**
 * Publishing service.
 * @param serveId 
 */
export async function publishServe(serveId: string | number) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/publish/${serveId}`, {
    method: 'POST'
  }
  );
}

/**
 * Rolls back the specified version of the service.
 * @param verCode 
 * @param params 
 */
export async function rollbackWithVersion(verCode: string, params: { serveId: number | string, name: string, code: string }) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/rollback/${params.serveId}/${verCode}`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}

/**
 * Move the service to the new grouping directory.
 * @param serveId 
 * @param newGroupId 
 */
export async function moveServe(serveId: number | string, newGroupId: number | string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/move/${serveId}/${newGroupId}`, {
    method: 'POST',
    data: {}
  }
  );
}

/**
 * Get serve information by id.
 * @param serveId 
 */
export async function fetchServeById(serveId: number | string) {
  return request<ApiBody<ServeItem>>(
    `${URI_PREFIX}/get/${serveId}`, {
    method: 'POST',
    data: {}
  }
  );
}

/**
 * Save serve group information.
 * @param params 
 */
export async function saveGroup(params: ServeGroupItem) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/group/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * Moving the group to new parent.
 * @param groupId 
 * @param newParentId 
 */
export async function moveGroup(groupId: number | string, newParentId: number | string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/group/move/${groupId}/${newParentId}`, {
    method: 'POST',
    data: {},
  });
}

/**
 * Deleted serve group information.
 * @param groupId 
 */
export async function delGroup(groupId: number | string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/group/del/${groupId}`, {
    method: 'POST',
    data: {},
  });
}

/**
 * Building a grouping tree.
 * @param params 
 */
export async function genGroupTree(params: ServeGroupTreeParams) {
  return request<ApiBody<TreeItem[]>>(
    `${URI_PREFIX}/group/tree`, {
    method: 'POST',
    data: {
      ...params,
    }
  })
}