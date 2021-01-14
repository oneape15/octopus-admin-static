import { ApiBody } from './Global';
import request from '@/utils/request';

import { ServeItem, ServeListParams, ServeGroupTreeParams } from './serve.d';

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