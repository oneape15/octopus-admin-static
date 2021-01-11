export interface ServeItem {
  id: number;
  name: string;
  code: string;
  icon?: string;
  timeBased: number;
  serveType: string;
  visualType: number;
  status: string;
}

export interface ServeListParams {
  name?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface ServeGroupTreeParams {
  serveType: string;
  addChildrenSize?: boolean;
  addRootNode?: boolean;
  addArchiveNode?: boolean;
  addPersonalNode?: boolean;
}