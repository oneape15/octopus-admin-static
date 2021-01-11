import { request } from 'umi';
import { UserItem, UserListParams } from './data';

export async function queryUser(params?: UserListParams) {
  return request('/api/users', {
    params,
  })
}

export async function addUser(params: UserItem) {
  return request('/api/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    }
  })
}

export async function updateUser(params: UserItem) {
  return request('/api/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    }
  })
}

export async function removeUser(params: { ids: number[] }) {
  return request('/api/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    }
  })
}