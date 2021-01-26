import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { Button, Modal, message, } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { requestIsOk, buildRequestData } from '@/utils/utils';
import {
  LockOutlined,
  UnlockOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { UserItem } from '@/services/user.d';
import { queryUser, saveUser, delUser, lockUser, unlockUser } from '@/services/user';
import OptionDropdown, { BTNS_KEY } from '@/components/OptionDropdown';
import UpdateUserForm from './components/UpdateUserForm';
import UserRoleDrawer from './components/UserRoleDrawer';

/**
 * save user
 * @param fields 
 */
const handleSave = async (fields: UserItem) => {
  const tag = fields.id > 0 ? '修改' : '添加';
  const hide = message.loading(`正在${tag}用户...`);
  try {
    const ret = await saveUser({ ...fields });
    if (requestIsOk(ret)) {
      message.success(`${tag}成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error('添加用户失败，请重试!');
    return false;
  }
}

/**
 * remove user
 * @param userId 
 */
const handleDel = async (userId: number) => {
  const hide = message.loading('正在删除...');
  try {
    const ret = await delUser(userId);
    hide();
    if (requestIsOk(ret)) {
      message.success(`删除成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error('删除用户失败, 请重试');
    return false;
  }
}

/**
 * lock user
 * @param userId 
 */
const handleLock = async (userId: number) => {
  const hide = message.loading('正在锁定...');
  try {
    const ret = await lockUser(userId);
    hide();
    if (requestIsOk(ret)) {
      message.success(`锁定成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error('锁定用户失败, 请重试');
    return false;
  }
}

/**
 * unlock user
 * @param userId 
 */
const handleUnlock = async (userId: number) => {
  const hide = message.loading('正在解锁...');
  try {
    const ret = await unlockUser(userId);
    hide();
    if (requestIsOk(ret)) {
      message.success(`解锁成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error('解锁用户失败, 请重试');
    return false;
  }
}

/**
 * check is lock status
 * @param value 
 */
const isLockStatus = (value: UserItem | undefined): boolean => {
  if (value) {
    return value.status === 'LOCK';
  }
  return false;
}

/**
 * check is normal status
 * @param value 
 */
const isNormalStatus = (value: UserItem | undefined): boolean => {
  if (value) {
    return value.status === 'NORMAL';
  }
  return false;
}

const UserManagePage: React.FC<{}> = () => {
  const [formVisible, handleFormVisible] = useState<boolean>(false);
  const [delModalVisible, handleDelModalVisible] = useState<boolean>(false);
  const [lockOptVisible, handleLockOptVisible] = useState<boolean>(false);
  const [userRoleVisible, setUserRoleVisible] = useState<boolean>(false);
  const [isLock, setIsLock] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [optValue, setOptValue] = useState<UserItem>();

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<UserItem>[] = [
    {
      title: '头像',
      dataIndex: 'avator',
      hideInSearch: true,
      render: (value, record) => {
        return <img alt=""
          src={record.avatar}
          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
        />
      }
    },
    { title: '用户名', dataIndex: 'username', tip: '用户名称', },
    {
      title: '状态', dataIndex: 'status', valueEnum: {
        INACTIVE: { text: '未激活', status: 'Default' },
        NORMAL: { text: '正常', status: 'Success' },
        LOCK: { text: '锁定', status: 'Error' },
      },
    },
    { title: '昵称', dataIndex: 'nickname', tip: '用户昵称', },
    { title: '手机号', dataIndex: 'phone', },
    { title: '邮箱', dataIndex: 'email', },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      valueType: 'option',
      render: (_, record) => (
        <OptionDropdown
          menuKeys={[
            { key: BTNS_KEY.EDIT, disabled: true, },
            { key: BTNS_KEY.DEL, disabled: true, },
            { key: 'setRole', title: '设置角色', disabled: true, icon: <TeamOutlined /> },
            { key: 'lock', title: '锁定', disabled: isNormalStatus(record), icon: <LockOutlined /> },
            { key: 'unlock', title: '解锁', disabled: isLockStatus(record), icon: <UnlockOutlined /> },
          ]}
          dataKey={record.id + ''}
          onItemClick={(dataKey: string, btnKey: string) => {
            switch (btnKey) {
              case BTNS_KEY.EDIT:
                handleFormVisible(true);
                setEditFlag(true);
                setOptValue(record);
                break;
              case BTNS_KEY.DEL:
                handleDelModalVisible(true);
                setOptValue(record);
                break;
              case 'setRole':
                setUserRoleVisible(true);
                setOptValue(record);
                break;
              case 'lock':
                handleLockOptVisible(true);
                setOptValue(record);
                setIsLock(false);
                break;
              case 'unlock':
                handleLockOptVisible(true);
                setOptValue(record);
                setIsLock(true);
                break;
            }
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
        columns={columns}
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => handleFormVisible(true)}>
            <PlusOutlined />添加
          </Button>
        ]}
        request={async (params, sorter, filter) => {
          const apiBody = await queryUser({ ...params, sorter, filter });
          return buildRequestData(apiBody);
        }}
      />
      {formVisible && (
        <UpdateUserForm
          formVisible={formVisible}
          editFlag={editFlag}
          values={optValue ? optValue : {}}
          onCancel={() => {
            handleFormVisible(false);
            setOptValue(undefined);
            setEditFlag(false);
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
      )}
      {delModalVisible && (
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
          <p>确认删除用户： {optValue?.username}</p>
        </Modal>
      )}
      {/* delete user modal */}
      <Modal
        title={isLock ? '解锁操作' : '锁定操作'}
        visible={lockOptVisible}
        okText="确认"
        cancelText="取消"
        width="320px"
        onCancel={() => {
          handleLockOptVisible(false);
          setIsLock(false);
          setOptValue(undefined);
        }}
        onOk={async () => {
          const id = optValue?.id ? optValue?.id : -1;
          const status = await (isLock ? handleUnlock(id) : handleLock(id));
          if (status) {
            handleLockOptVisible(false);
            setIsLock(false);
            setOptValue(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          };
        }}
      >
        <p>确定{isLock ? '解锁' : '锁定'}用户：{optValue?.username}</p>
      </Modal>
      {/* user role set drawer */}
      <UserRoleDrawer
        drawerVisible={userRoleVisible}
        userId={optValue ? optValue.id : -1}
        onColse={() => {
          setUserRoleVisible(false);
          setOptValue(undefined);
        }}
      />

    </PageContainer>
  );
}

export default UserManagePage;