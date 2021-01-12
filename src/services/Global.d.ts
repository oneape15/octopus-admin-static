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