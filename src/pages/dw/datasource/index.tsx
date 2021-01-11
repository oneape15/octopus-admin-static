import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { Button, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { queryDataSource, saveDataSource, changeDataSourceStatus, syncSchema } from '@/services/datasource';
import DataSoureForm from './components/DataSourceForm';
import OptionDropdown, { BTNS_KEY } from '@/components/OptionDropdown';

/**
 * 添加节点
 * @param fields
 */
const handleSave = async (fields: API.DataSoureItem) => {
  const tag = fields.id > 0 ? '修改' : '添加';
  const hide = message.loading(`正在${tag}...`);
  try {
    const ret = await saveDataSource({ ...fields });
    hide();
    if (ret.code === 200) {
      message.success(`${tag}成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error(`${tag}失败请重试！`);
    return false;
  }
};

const handleStatus = async (id: number, status: number) => {
  const tag = status === 0 ? '启用' : '禁用';
  const hide = message.loading(`正在${tag}...`);
  try {
    const ret = await changeDataSourceStatus({ id, status: status === 0 ? 1 : 0 });
    hide();
    if (ret.code === 200) {
      message.success(`${tag}成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error(`${tag}失败请重试！`);
    return false;
  }
}

const handleSync = async (id: number) => {
  const hide = message.loading(`正在执行同步...`);
  try {
    const ret = await syncSchema({ id });
    hide();
    if (ret.code === 200) {
      message.success(`同步成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error(`同步失败请重试！`);
    return false;
  }
}

const DataSoureManagePage: React.FC<{}> = () => {
  const [formVisible, handleFormVisible] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [editValue, setEditValue] = useState({});
  const actionRef = useRef<ActionType>();
  const [modal] = Modal.useModal();

  const columns: ProColumns<API.DataSoureItem>[] = [
    { title: '数据源名称', dataIndex: 'name' },
    {
      title: '类型', dataIndex: 'type', valueEnum: {
        MySQL: { text: 'MySQL', status: 'Default' },
        PostgreSQL: { text: 'PostgreSQL', status: 'Success' },
        ODPS: { text: 'ODPS', status: 'Error' },
      }
    },
    { title: 'URL', dataIndex: 'jdbcUrl' },
    { title: '登录名', dataIndex: 'username' },
    {
      title: '读写权限', dataIndex: 'readOnly', valueEnum: {
        0: { text: '只读', status: 'Default' },
        1: { text: '可写', status: 'Success' },
      }
    },
    {
      title: 'DDL权限', dataIndex: 'canDdl', valueEnum: {
        0: { text: '无', status: 'Default' },
        1: { text: '拥有', status: 'Success' },
      }
    },
    {
      title: '状态', dataIndex: 'status', valueEnum: {
        0: { text: '启用', status: 'Success' },
        1: { text: '禁用', status: 'Default' },
      }
    },
    {
      title: '信息同步', dataIndex: 'sync', valueEnum: {
        0: { text: '不同步', status: 'Default' },
        1: { text: '同步', status: 'Success' },
      }
    },
    { title: '创建时间', dataIndex: 'createdAt' },
    {
      title: '操作', dataIndex: 'option', align: 'center', valueType: 'option',
      render: (_, record) => (
        <OptionDropdown
          menuKeys={[
            { key: BTNS_KEY.EDIT, disabled: true, },
            { key: BTNS_KEY.DEL, disabled: true, },
            { key: BTNS_KEY.SYNC, disabled: true, },
            { key: record.status === 0 ? BTNS_KEY.DISABLED : BTNS_KEY.ENABLE, disabled: true, },
          ]}
          dataKey={record.id}
          onItemClick={(key, id) => {
            switch (key) {
              case BTNS_KEY.EDIT:
                handleFormVisible(true);
                setEditFlag(true);
                setEditValue(record);
                break;
              case BTNS_KEY.DEL:

                break;
              case BTNS_KEY.SYNC:
                handleSync(id);
                break;
              case BTNS_KEY.DISABLED:
                if (handleStatus(id, 0) && actionRef.current) {
                  actionRef.current.reload();
                };
                break;
              case BTNS_KEY.ENABLE:
                if (handleStatus(id, 1) && actionRef.current) {
                  actionRef.current.reload();
                };
                break;
            }
          }} />
      )
    }
  ];

  return (
    <PageContainer>
      <div style={{ display: formVisible ? 'none' : 'block' }}>
        <ProTable<API.DataSoureItem>
          size="small"
          actionRef={actionRef}
          rowKey="id"
          columns={columns}
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button key="add" type="primary" onClick={() => handleFormVisible(true)}>
              <PlusOutlined />添加
          </Button>
          ]}
          request={async (params, sorter, filter) => {
            const msgBody = await queryDataSource({ ...params, sorter, filter });
            console.log(msgBody);
            const { list, total, } = msgBody.data;
            let pageInfo = {
              data: list,
              total: total
            };
            return pageInfo;
          }}
        />
      </div>
      <div style={{ display: formVisible ? 'block' : 'none' }}>
        <DataSoureForm
          formVisible={formVisible}
          editFlag={editFlag}
          values={editValue}
          onCancel={() => {
            handleFormVisible(false);
            setEditFlag(false);
            setEditValue({});

          }}
          onSubmit={async (value) => {
            const success = await handleSave(value);
            if (success) {
              handleFormVisible(false);
              setEditFlag(false);
              setEditValue({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      </div>
    </PageContainer>
  );
}

export default DataSoureManagePage;