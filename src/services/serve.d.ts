import { BaseItem, BaseQueryParams } from './Global';

export interface ServeItem extends BaseItem {
  id: number;
  name: string;
  code: string;
  icon?: string;
  timeBased: number;
  serveType: string;
  visualType: number;
  status: string;
}

export interface ServeListParams extends BaseQueryParams {
  name?: string;
}

export interface ServeGroupTreeParams {
  serveType: string;
  addChildrenSize?: boolean;
  addRootNode?: boolean;
  addArchiveNode?: boolean;
  addPersonalNode?: boolean;
}