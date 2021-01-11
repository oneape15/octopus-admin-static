import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { Tabs, Button, Menu, Dropdown, Divider, message, Input, Drawer } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import style from './index.less';
import ServeList from './components/ServeList';

const ServeManagePage: React.FC<{}> = () => {

  return (
    // <PageContainer>
    <div className={style.content}>
      <Tabs defaultActiveKey="INTERFACE" type="line">
        <Tabs.TabPane tab={
          <span><AppleOutlined />接口管理</span>
        } key="INTERFACE">
          <ServeList serveType="INTERFACE" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="聚合接口管理" key="aggPort">
          <ServeList serveType="aggPort" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="报表管理" key="REPORT">
          <ServeList serveType="REPORT" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="LOV管理" key="LOV">
          <ServeList serveType="LOV" />
        </Tabs.TabPane>
        
      </Tabs>
    </div>
    // </PageContainer>
  );
}

export default ServeManagePage;