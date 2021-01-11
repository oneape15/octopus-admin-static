export interface RoleItem {
  id: number;
  name: string;
}

export interface UserItem {
  id: number;
  name: string;
  nickname: string;
  avatar: string;
  phone: string;
  email: string;
}

export interface UserListParams {
  name?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}