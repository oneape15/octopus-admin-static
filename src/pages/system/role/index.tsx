import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {RoleItem} from '../data';

import styles from './style.less';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

const RoleManagePage: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<RoleItem>
        headerTitle="角色列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth:120,
        }}
        >

        </ProTable>
    </PageContainer>
  );
}

export default RoleManagePage;