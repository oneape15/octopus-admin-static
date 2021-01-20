import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { requestIsOk, buildRequestData } from '@/utils/utils';
import OptionDropdown, { BTNS_KEY } from '@/components/OptionDropdown';
import { RoleItem } from '@/services/role.d';
import { queryRole, saveRole, delRole } from '@/services/role';
import UpdateRoleForm from './components/UpdateRoleForm';


/**
 * save role.
 * @param fields
 */
const handleSave = async (fields: RoleItem) => {
  const tag = fields.id > 0 ? '修改' : '添加';
  const hide = message.loading(`正在${tag}...`);
  try {
    const ret = await saveRole({ ...fields });
    hide();
    if (requestIsOk(ret)) {
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
 * delete role.
 * @param id 
 */
const handleDel = async (id: number) => {
  const hide = message.loading(`正在删除角色...`);
  try {
    const ret = await delRole(id);
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
    message.error(`删除失败请重试！`);
    return false;
  }
}


const RoleManagePage: React.FC<{}> = () => {
  const [formVisible, handleFormVisible] = useState<boolean>(false);
  const [delModalVisible, handleDelModalVisible] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<RoleItem>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<RoleItem>[] = [
    { title: '角色名', dataIndex: 'name' },
    { title: '角色编码', dataIndex: 'code' },
    {
      title: '角色类型', dataIndex: 'type', valueEnum: {
        0: { text: '普通', status: 'Success' },
        1: { text: '默认', status: 'Default' },
        2: { text: '系统', status: 'Default' },
      }
    },
    {
      title: '操作', dataIndex: 'option', align: 'center', valueType: 'option',
      render: (_, record) => (
        <OptionDropdown
          menuKeys={[
            { key: BTNS_KEY.EDIT, disabled: true, },
            { key: BTNS_KEY.DEL, disabled: true, },
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
                handleDelModalVisible(true);
                setEditValue(record);
                break;
            }
          }}
        />
      )
    }
  ];

  return (
    <PageContainer>
      <ProTable<RoleItem>
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
          <Button key="add" type="primary" onClick={() => {
            handleFormVisible(true);
            setEditFlag(false);
          }
          }>
            <PlusOutlined />添加
        </Button>
        ]}
        request={async (params, sorter, filter) => {
          const apiBody = await queryRole({ ...params, sorter, filter });
          return buildRequestData(apiBody);
        }}
      >
      </ProTable>
      {formVisible && (
        <UpdateRoleForm
          formVisible={formVisible}
          editFlag={editFlag}
          values={editValue ? editValue : {}}
          onCancel={() => {
            handleFormVisible(false);
            setEditFlag(false);
            setEditValue(undefined);
          }}
          onSubmit={async (value) => {
            const success = await handleSave(value);
            if (success) {
              handleFormVisible(false);
              setEditFlag(false);
              setEditValue(undefined);
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
            setEditValue(undefined);
            handleDelModalVisible(false);
          }}
          onOk={() => {
            const id = editValue?.id ? editValue?.id : -1;
            const status = handleDel(id);
            if (status) {
              setEditValue(undefined);
              handleDelModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            };
          }}
        >
          <p>确认删除角色： {editValue?.name}</p>
        </Modal>
      )}
    </PageContainer>
  );
}

export default RoleManagePage;