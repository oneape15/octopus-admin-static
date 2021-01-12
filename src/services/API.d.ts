declare namespace API {

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
   * 数据源对象
   */
  export interface DataSoureItem extends BaseItem {
    name: string;
    type: string;
    status: number;
    jdbcUrl: string;
    jdbcDriver?: string;
    username: string;
    password?: string;
    sync?: number;
    cron?: string;
    timeout?: number;
    maxPoolSize?: number;
    minIdle?: number;
    readOnly?: number;
    canDdl?: number;
    testSql?: string;
    comment?: string;
  }

  export interface TableSchemaItem extends BaseItem {
    schemaName: string;
    name: string;
    alias?: string;
  }

  export interface DataSourceType {
    type: string;
    driver: string;
  }

  export interface DataSourceParams extends BaseQueryParams {
    name?: string;
  }

  export interface CurrentUser {
    id?: string;
    username?: string;
    nickname?: string;
    avatar?: string;
    phone?: string;
    title?: string;
    group?: string;
    gender?: number;
    tags?: {
      key: string;
      label: string;
    }[];
    deptId?: number;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
