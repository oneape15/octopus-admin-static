import React, { ReactNode, useCallback } from 'react';
import { Dropdown, Menu } from 'antd';
import style from './index.less';

import {
  MenuOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
  CloudSyncOutlined,
  SwitcherOutlined,
  BuildOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

export const BTNS_KEY = {
  ADD: 'add',
  RUN: 'run',
  VIEW: 'view',
  EDIT: 'edit',
  DEL: 'delete',
  SYNC: 'sync',
  MOVE: 'move',
  DISABLED: 'disabled',
  ENABLE: 'enable',
}

export interface BtnStatus {
  key: string;
  disabled: boolean;
  title?: string;
  icon?: ReactNode;
}
export interface OptionDropdownProps {
  menuKeys: BtnStatus[];
  dataKey: number | string;
  onItemClick: (key: string, dataKey: number) => void;
}

const OptionDropdown: React.FC<OptionDropdownProps> = (props) => {
  const { menuKeys, dataKey, onItemClick } = props;
  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      onItemClick(key.toString(), Number(dataKey));
    },
    [],
  );

  const renderItems = (btns: BtnStatus[]) => {
    const items: any[] = [];
    btns.forEach(btn => {
      let item;
      switch (btn.key) {
        case BTNS_KEY.ADD:
          item = (
            <Menu.Item key={BTNS_KEY.ADD} disabled={!btn.disabled}>
              <AppstoreAddOutlined />&nbsp;{btn.title ? btn.title : '新增'}
            </Menu.Item>
          )
          break;
        case BTNS_KEY.DEL:
          item = (
            <Menu.Item key={BTNS_KEY.DEL} disabled={!btn.disabled}>
              <DeleteOutlined />&nbsp;{btn.title ? btn.title : '删除'}
            </Menu.Item>
          )
          break;
        case BTNS_KEY.EDIT:
          item = (
            <Menu.Item key={BTNS_KEY.EDIT} disabled={!btn.disabled}>
              <EditOutlined />&nbsp;{btn.title ? btn.title : '编辑'}
            </Menu.Item>
          )
          break;
        case BTNS_KEY.RUN:
          item = (
            <Menu.Item key={BTNS_KEY.RUN} disabled={!btn.disabled}>
              <SendOutlined />&nbsp;{btn.title ? btn.title : '执行'}
            </Menu.Item>
          )
          break;
        case BTNS_KEY.SYNC:
          item = (
            <Menu.Item key={BTNS_KEY.SYNC} disabled={!btn.disabled}>
              <CloudSyncOutlined />&nbsp;{btn.title ? btn.title : '同步'}
            </Menu.Item>
          )
          break;
        case BTNS_KEY.MOVE:
          item = (
            <Menu.Item key={BTNS_KEY.MOVE} disabled={!btn.disabled}>
              <BuildOutlined />&nbsp;{btn.title ? btn.title : '移动'}
            </Menu.Item>
          )
          break
        case BTNS_KEY.VIEW:
          item = (
            <Menu.Item key={BTNS_KEY.VIEW} disabled={!btn.disabled}>
              <EyeOutlined />&nbsp;{btn.title ? btn.title : '查看'}
            </Menu.Item>
          )
          break;
        case BTNS_KEY.DISABLED:
          item = (
            <Menu.Item key={BTNS_KEY.DISABLED} disabled={!btn.disabled}>
              <SwitcherOutlined />&nbsp;{btn.title ? btn.title : '禁用'}
            </Menu.Item>
          )
          break;
        case BTNS_KEY.ENABLE:
          item = (
            <Menu.Item key={BTNS_KEY.ENABLE} disabled={!btn.disabled}>
              <SwitcherOutlined />&nbsp;{btn.title ? btn.title : '启用'}
            </Menu.Item>
          )
          break;
        default:
          item = (
            <Menu.Item key={btn.key} disabled={!btn.disabled}>
              {btn.icon}&nbsp;{btn.title ? btn.title : btn.key}
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
