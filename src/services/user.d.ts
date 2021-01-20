import { BaseItem, BaseQueryParams } from './Global.d';

export interface RoleItem {
  id: number;
  name: string;
}

export interface CurrentUser {
  id?: string;
  username?: string;
  nickname?: string;
  avatar?: string;
  phone?: string;
  title?: string;
  group?: string;
  gender?: number;
  tags?: {
    key: string;
    label: string;
  }[];
  deptId?: number;
  access?: 'user' | 'guest' | 'admin';
  unreadCount?: number;
}

export interface UserItem extends BaseItem {
  username: string;
  nickname: string;
  password?: string;
  avatar: string;
  phone?: string;
  email?: string;
  deptId?: number;
  status?: string;
  gender?: number;
}

export interface UserListParams extends BaseQueryParams {
  name?: string;
}