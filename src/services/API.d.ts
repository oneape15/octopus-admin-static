declare namespace API {

  export interface MsgBody<T> {
    code: number;
    msg?: string;
    data?: T
  }

  export interface PageInfo<T> {
    total?: number;
    data?: T[]
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
   * 数据源信息
   */
  export interface DataSoureItem extends BaseItem {
    id: number;
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

  export interface DataSourceParams {
    name?: string;
    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };
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

  export interface StateType {
    code: number;
    data?: {},
    msg?: string;
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
