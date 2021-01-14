declare namespace API {

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
