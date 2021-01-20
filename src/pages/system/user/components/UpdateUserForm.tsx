import React, { useState, useEffect } from 'react';
import {
  Modal,
  Input,
  Form,
  TreeSelect,
} from 'antd';
import { DataNode } from 'antd/lib/tree';

import { UserItem } from '@/services/user.d';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

export interface RoleFormProps {
  onCancel: (flag?: boolean, formVals?: UserItem) => void;
  onSubmit: (values: UserItem) => void;
  formVisible: boolean;
  editFlag: boolean;
  values: Partial<UserItem>;
}

const UpdateRoleForm: React.FC<RoleFormProps> = (props) => {
  const [treeData, setTreeData] = useState<DataNode[]>();
  const { editFlag, values } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(Object.assign({}, { type: 0 }, values));
  })

  const onChange = (value: any) => {
    console.log(value);
  }

  return (
    <Modal
      width={440}
      destroyOnClose
      title={`${editFlag ? '修改' : '添加'}用户`}
      visible={props.formVisible}
      onCancel={() => props.onCancel()}
      onOk={() => {
        props.onSubmit(form.getFieldsValue());
      }}
    >
      <Form
        {...layout}
        form={form}
        scrollToFirstError
      >
        <Form.Item name="id" hidden >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input name="username" />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱地址"
          rules={[{ required: true, message: '请输入有效的邮箱地址！' }]}
        >
          <Input name="email" />
        </Form.Item>
        <Form.Item
          name="deptId"
          label="所属部门"
          rules={[{ required: true, message: '请选择父节点！' }]}
        >
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择..."
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item
          name="nickname"
          label="昵称"
        >
          <Input name="nickname" />
        </Form.Item>
        
        <Form.Item
          name="comment"
          label="备注信息"
        >
          <Input.TextArea name="comment" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateRoleForm;