import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Layout, Tree, Input, Button, Menu, Dropdown, Divider, message, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ServeItem } from '../../data';
import { queryServe, genGroupTree } from '../../service'
import style from '../index.less';

const { Sider, Content } = Layout;

export interface ServeListProps {
  serveType: string;
}

const ServeList: React.FC<ServeListProps> = ({ serveType }) => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<ServeItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '编码',
      dataIndex: 'code',
    },
    {
      title: '时间性',
      dataIndex: 'timeBased',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
  ];

  const onExpand = (expandedKeys: []) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }
  const buildTree = () => {
    return [
      {
        key: '001',
        title: '报表',
        children: []
      }
    ];
  }

  return (
    <Layout className={style.serveLayout}>
      <Sider className={style.serveSider} width={240}>
        <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
        <Tree
          onExpand={() => onExpand}
          autoExpandParent={autoExpandParent}
          // treeData={() => buildTree}
        />
      </Sider>
      <Content>
        <ProTable<ServeItem>
          size="small"
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button key="add" type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined />添加
        </Button>
          ]}
          request={(params, sorter, filter) => queryServe({ ...params, sorter, filter })}
          columns={columns}
        >
        </ProTable>
      </Content>
    </Layout>
  );
}

export default ServeList;