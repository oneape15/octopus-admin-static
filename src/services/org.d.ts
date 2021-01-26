import { BaseItem, BaseQueryParams } from './Global';

export interface OrgItem extends BaseItem {
  parentId: number;
  name: string;
  code: string;
  deptHeadUserId: number;
}


export interface OrgTreeParams {
  addChildrenSize?: boolean;
  addRootNode?: boolean;
  disabledKeys?: string[]
}