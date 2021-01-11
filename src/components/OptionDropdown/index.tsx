import React, { useCallback } from 'react';
import { Dropdown, Menu } from 'antd';
import style from './index.less';

import {
  MenuOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
  CloudSyncOutlined,
  SwitcherOutlined
} from '@ant-design/icons';

export const BTNS_KEY = {
  RUN: 'run',
  VIEW: 'view',
  EDIT: 'edit',
  DEL: 'delete',
  SYNC: 'sync',
  DISABLED: 'disabled',
  ENABLE: 'enable',
}

export interface BtnStatus {
  key: string;
  disabled: boolean;
}
export interface OptionDropdownProps {
  menuKeys: BtnStatus[];
  dataKey: number;
  onItemClick: (key: string, dataKey: number) => void;
}

const OptionDropdown: React.FC<OptionDropdownProps> = ({ menuKeys, dataKey, onItemClick }) => {

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      onItemClick(key.toString(), dataKey);
    },
    [],
  );

  const renderItems = (btns: BtnStatus[]) => {
    const items: any[] = [];
    btns.forEach(btn => {
      let item;
      switch (btn.key) {
        case BTNS_KEY.DEL:
          item = (
            <Menu.Item key={BTNS_KEY.DEL} disabled={!btn.disabled}>
              <DeleteOutlined />&nbsp;删除
            </Menu.Item>
          )
          break;
        case BTNS_KEY.EDIT:
          item = (
            <Menu.Item key={BTNS_KEY.EDIT} disabled={!btn.disabled}>
              <EditOutlined />&nbsp;编辑
            </Menu.Item>
          )
          break;
        case BTNS_KEY.RUN:
          item = (
            <Menu.Item key={BTNS_KEY.RUN} disabled={!btn.disabled}>
              <SendOutlined />&nbsp;执行
            </Menu.Item>
          )
          break;
        case BTNS_KEY.SYNC:
          item = (
            <Menu.Item key={BTNS_KEY.SYNC} disabled={!btn.disabled}>
              <CloudSyncOutlined />&nbsp;同步
            </Menu.Item>
          )
          break;
        case BTNS_KEY.VIEW:
          item = (
            <Menu.Item key={BTNS_KEY.VIEW} disabled={!btn.disabled}>
              <EyeOutlined />&nbsp;查看
            </Menu.Item>
          )
          break;
        case BTNS_KEY.DISABLED:
          item = (
            <Menu.Item key={BTNS_KEY.DISABLED} disabled={!btn.disabled}>
              <SwitcherOutlined />&nbsp;禁用
            </Menu.Item>
          )
          break;
        case BTNS_KEY.ENABLE:
          item = (
            <Menu.Item key={BTNS_KEY.ENABLE} disabled={!btn.disabled}>
              <SwitcherOutlined />&nbsp;启用
            </Menu.Item>
          )
          break;
      }
      items.push(item);
    })
    return items;
  }

  const menuOptionDropdown = (
    <Menu className={style.menu} selectedKeys={[]} onClick={onMenuClick}>
      {renderItems(menuKeys)}
    </Menu>
  );

  return (
    <Dropdown overlay={menuOptionDropdown} placement="bottomCenter">
      <div><MenuOutlined /></div>
    </Dropdown>
  );
}

export default OptionDropdown;
