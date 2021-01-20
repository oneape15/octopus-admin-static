import request from '@/utils/request';

import { ApiBody, PageInfo } from './Global.d';
import { UserItem, CurrentUser, UserListParams } from './user.d';

const URI_PREFIX = '/api/account';

/**
 * Get full user information.
 */
export async function queryCurrent() {
  return request<ApiBody<CurrentUser>>(
    `${URI_PREFIX}/currentUser`, {
    method: 'GET',
  }
  );
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

/**
 * Paging for user information
 * @param params 
 */
export async function queryUser(params?: UserListParams) {
  return request<ApiBody<PageInfo<CurrentUser[]>>>(
    `${URI_PREFIX}/list`, {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * Save user information.
 * @param params 
 */
export async function saveUser(params: UserItem) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * Deleted user information.
 * @param userId 
 */
export async function delUser(userId: number | string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/del/${userId}`, {
    method: 'POST'
  })
}

/**
 * lock user.
 * @param userId 
 */
export async function lockUser(userId: number | string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/lockUser/${userId}`, {
    method: 'POST'
  })
}


/**
 * unlock user.
 * @param userId 
 */
export async function unlockUser(userId: number | string) {
  return request<ApiBody<string>>(
    `${URI_PREFIX}/unlockUser/${userId}`, {
    method: 'POST'
  })
}