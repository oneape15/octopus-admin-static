import React, { useState, useRef, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Layout, Button, Menu, Dropdown, Divider, message, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ServeItem } from '@/services/serve.d';
import { queryServe, genGroupTree } from '@/services/serve'
import style from '../index.less';
import SourceTree from '@/components/SourceTree';
import { codeIsOk, buildRequestData } from '@/utils/utils';
import { TreeItem } from '@/services/Global';

const { Sider, Content } = Layout;

export interface ServeListProps {
  serveType: string;
  onAddGroupClick: (pId: number | undefined) => void;
}

const ServeList: React.FC<ServeListProps> = (props) => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<ServeItem>[] = [
    { title: '名称', dataIndex: 'name', },
    { title: '编码', dataIndex: 'code', },
    { title: '时间性', dataIndex: 'timeBased', },
    { title: '状态', dataIndex: 'status', },
  ];

  useEffect(() => {
    genGroupTree({
      serveType: props.serveType,
      addArchiveNode: true,
      addPersonalNode: true,
      addRootNode: true,
      addChildrenSize: true,
    }).then(apiBody => {
      const { code, data, msg } = apiBody;
      if (codeIsOk(code) && data) {
        setTreeData(data);
      } else {
        message.error(msg);
        setTreeData([])
      }
    }).catch(err => {
      message.error(err);
    })
  }, [props.serveType])
  return (
    <Layout className={style.serveLayout}>
      <Sider className={style.serveSider} width={240}>
        <SourceTree
          treeData={treeData ? treeData: []}
          onAddClick={(pId: number) => props.onAddGroupClick(pId)}
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
          request={async (params, sorter, filter) => {
            const apiBody = await queryServe({ ...params, sorter, filter, serveType: props.serveType });
            return buildRequestData(apiBody);
          }}
          columns={columns}
        >
        </ProTable>
      </Content>
    </Layout>
  );
}

export default ServeList;