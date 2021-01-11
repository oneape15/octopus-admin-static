import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { Button, Menu, Dropdown, Divider, message, Input, Drawer } from 'antd';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateUserForm from './components/CreateUserForm';

import { UserItem } from '../data';
import { queryUser, addUser, updateUser, removeUser } from '../service';
import styles from './style.less';
import OptionDropdown from '@/components/OptionDropdown';

/**
 * add user
 * @param fields 
 */
const handleAdd = async (fields: UserItem) => {
  const hide = message.loading('正在添加用户');
  try {
    await addUser({ ...fields });
  } catch (error) {
    hide();
    message.error('添加用户失败，请重试!');
    return false;
  }
}

/**
 * update user information.
 * @param fields 
 */
const handleUpdate = async (fields: UserItem) => {
  const hide = message.loading('正在更新用户信息');
  try {
    await updateUser({
      ...fields
    });
    hide();
    message.success('更新用户信息成功！');
    return true;
  } catch (error) {
    hide();
    message.error('更新用户信息失败！');
    return false;
  }
}

/**
 * remove user
 * @param selectRows 
 */
const handleRemove = async (selectRows: UserItem[]) => {
  const hide = message.loading('正在删除...');
  if (!selectRows) return true;
  try {
    await removeUser({
      ids: selectRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新！');
    return true;
  } catch (error) {
    hide();
    message.error('删除用户失败, 请重试');
    return false;
  }
}

const RoleManagePage: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<UserItem>();
  const [selectedRowsState, setSelectedRows] = useState<UserItem[]>([]);
  const columns: ProColumns<UserItem>[] = [
    {
      title: '头像',
      dataIndex: 'avator',
      hideInForm: true,
      render: (value, record) => {
        return <img alt=""
          src={record.avatar}
          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
        />
      }
    },
    {
      title: '用户名',
      dataIndex: 'name',
      tip: '用户名称',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户名必填',
          }
        ]
      }
    },
    {
      title: '状态', dataIndex: 'status', valueEnum: {
        0: { text: '未激活', status: 'Default' },
        1: { text: '正常', status: 'Success' },
        2: { text: '锁定', status: 'Error' },
      },
    },
    { title: '昵称', dataIndex: 'nickname', tip: '用户昵称', },
    { title: '手机号', dataIndex: 'phone' },
    { title: '邮箱', dataIndex: 'email', },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      valueType: 'option',
      render: (_, record) => (
        <OptionDropdown
          menus
          dataKey={record.id}
          onItemClick={(key, id) => {
            console.log(key, id);
          }} />
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserItem>
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
        request={(params, sorter, filter) => queryUser({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择<a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>&nbsp;项&nbsp;
          </div>
          }
        >
          <Button>批量锁定</Button>
          <Button>批量删除</Button>
        </FooterToolbar>
      )}
      <CreateUserForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} >

      </CreateUserForm>
    </PageContainer>
  );
}

export default RoleManagePage;