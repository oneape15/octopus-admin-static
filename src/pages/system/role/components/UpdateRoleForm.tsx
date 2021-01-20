import React, { useEffect } from 'react';
import {
  Modal,
  Input,
  Form,
  Radio
} from 'antd';
import { RoleItem } from '@/services/role.d';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

export interface RoleFormProps {
  onCancel: (flag?: boolean, formVals?: RoleItem) => void;
  onSubmit: (values: RoleItem) => void;
  formVisible: boolean;
  editFlag: boolean;
  values: Partial<RoleItem>;
}

const UpdateRoleForm: React.FC<RoleFormProps> = (props) => {
  const { editFlag, values } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(Object.assign({}, { type: 0 }, values));
  })

  return (
    <Modal
      width={440}
      destroyOnClose
      title={`${editFlag ? '修改' : '添加'}角色`}
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
          name="name"
          label="角色名"
          rules={[{ required: true, message: '请输入角色名称！' }]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          name="code"
          label="角色编码"
          rules={[{ required: true, message: '请输入角色编码！' }]}
        >
          <Input name="code" />
        </Form.Item>
        <Form.Item
          name="type"
          label="角色类型"
          rules={[{ required: true, message: '请选择角色类型！' }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={0}>普通角色</Radio.Button>
            <Radio.Button value={1}>默认角色</Radio.Button>
            <Radio.Button value={2}>系统角色</Radio.Button>
          </Radio.Group>
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