import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { Button, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import {
  queryDataSource,
  saveDataSource,
  changeDataSourceStatus,
  syncSchema,
  delDataSoure,
} from '@/services/datasource';
import {DataSoureItem} from '@/services/datasource.d';
import DataSoureForm from './components/DataSourceForm';
import OptionDropdown, { BTNS_KEY } from '@/components/OptionDropdown';

/**
 * 保存数据源
 * @param fields
 */
const handleSave = async (fields: DataSoureItem) => {
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

/**
 * 修改数据源状态
 * @param id 
 * @param status 
 */
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

/**
 * 执行同步操作
 * @param id 
 */
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

/**
 * 删除数据源操作
 * @param id 
 */
const handleDel = async (id: number) => {
  const hide = message.loading(`正在删除数据源...`);
  try {
    const ret = await delDataSoure(id);
    hide();
    if (ret.code === 200) {
      message.success(`删除成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error(`删除失败请重试！`);
    return false;
  }
}

const DataSourceManagePage: React.FC<{}> = () => {
  const [formVisible, handleFormVisible] = useState<boolean>(false);
  const [delModalVisible, handleDelModalVisible] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [optValue, setOptValue] = useState<DataSoureItem>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<DataSoureItem>[] = [
    { title: '数据源名称', dataIndex: 'name' },
    {
      title: '类型', dataIndex: 'type', valueEnum: {
        MySQL: { text: 'MySQL' },
        PostgreSQL: { text: 'PostgreSQL' },
        ODPS: { text: 'ODPS' },
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
                setOptValue(record);
                break;
              case BTNS_KEY.DEL:
                handleDelModalVisible(true);
                setOptValue(record);
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
        <ProTable<DataSoureItem>
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
            const { code, data: { list, total }, msg } = await queryDataSource({ ...params, sorter, filter });
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
          values={optValue}
          onCancel={() => {
            handleFormVisible(false);
            setEditFlag(false);
            setOptValue(undefined);

          }}
          onSubmit={async (value) => {
            const success = await handleSave(value);
            if (success) {
              handleFormVisible(false);
              setEditFlag(false);
              setOptValue(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      </div>
      <Modal
        title="删除操作"
        visible={delModalVisible}
        okText="确认"
        cancelText="取消"
        width="320px"
        onCancel={() => {
          setOptValue(undefined);
          handleDelModalVisible(false);
        }}
        onOk={() => {
          const id = optValue?.id ? optValue?.id : -1;
          const status = handleDel(id);
          if (status) {
            setOptValue(undefined);
            handleDelModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          };
        }}
      >
        <p>确认删除数据源： {optValue?.name}</p>
      </Modal>
    </PageContainer>
  );
}

export default DataSourceManagePage;