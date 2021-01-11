import { request } from 'umi';
import { ServeItem, ServeListParams, ServeGroupTreeParams } from './data';

export async function queryServe(params?: ServeListParams) {
  return request('/api/serves', {
    params,
  })
}

export async function genGroupTree(params: ServeGroupTreeParams) {
  return request('/api/serve/group/tree', {
    params,
  })
}
