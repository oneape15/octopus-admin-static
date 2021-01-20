import { BaseItem, BaseQueryParams } from './Global';

export interface RoleItem extends BaseItem {
  name: string;
  code: string;
  type: number;
  comment?: string;
}

export interface RoleParams extends BaseQueryParams {
  name?: string;
  code?: string;
  type?: number;
}

export interface RoleRlSchemaItem extends BaseItem {
  roleId: number;
  datasourceId: number;
  tableName: string;
  expireTime: number;
}