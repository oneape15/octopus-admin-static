import request from '@/utils/request';
import { ApiBody } from '@/services/Global';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<ApiBody<API.CurrentUser>>('/api/account/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
