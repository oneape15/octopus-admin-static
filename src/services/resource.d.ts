import { BaseItem, BaseQueryParams } from './Global';

export interface ResourceItem extends BaseItem {
  parentId: number;
  name: string;
  code: string;
  icon?: string;
  type: number;
  path?: string;
  sortId?: number;
  comment?: string;
}

export interface ResourceParams extends BaseQueryParams {
  name?: string;
  code?: string;
  type?: number;
}
