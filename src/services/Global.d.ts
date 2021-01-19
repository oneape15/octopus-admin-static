import { ReactNode } from "react";

export interface ApiBody<T> {
  code: number;
  msg?: string;
  data?: T
}

export interface PageInfo<T> {
  total?: number;
  list?: T
}

export interface ItemProps {
  label: string;
  value: string;
}

/**
  * 基础信息
  */
export interface BaseItem {
  id: number;
  creator?: number;
  created?: number;
  modifier?: number;
  modified?: number;
}

/**
 * 查询基础参数
 */
export interface BaseQueryParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

/**
 * Tree item
 */
export interface TreeItem {
  title: string;
  key: string;
  icon?: ReactNode | string;
  children?: TreeItem[]
  disabled?: boolean;
  selectable?: boolean;
  isLeaf?: boolean;
  props?: { [key: string]: any | any[] }
}