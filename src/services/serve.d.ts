import { BaseItem, BaseQueryParams } from './Global';

export const ServeType = {
  INTERFACE: 'INTERFACE',
  AGG: 'AGG',
  REPORT: 'REPORT',
  LOV: 'LOV',
}

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

export interface ServeGroupItem extends BaseItem {
  parentId: number;
  name: string;
  serveType: string;
  icon?: string;
  comment?: string;
}

export interface ServeListParams extends BaseQueryParams {
  name?: string;
  serveType: string;
}

export interface ServeGroupTreeParams {
  serveType: string;
  addChildrenSize?: boolean;
  addRootNode?: boolean;
  addArchiveNode?: boolean;
  addPersonalNode?: boolean;
}