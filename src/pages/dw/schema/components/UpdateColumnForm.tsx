import React, { useEffect } from 'react';
import { Modal, Input, Form } from 'antd';

import { TableColumnItem } from '@/services/schema.d';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};
export interface UpdateColumnFormProps {
  onCancel: (flag?: boolean, formVals?: TableColumnItem) => void;
  onSubmit: (values: TableColumnItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableColumnItem>;
}

const UpdateColumnForm: React.FC<UpdateColumnFormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(Object.assign({}, { async: 1 }, props.values));
  });

  return (
    <Modal
      width={640}
      destroyOnClose
      title="字段信息修改"
      visible={props.updateModalVisible}
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
          label="字段名"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item
          name="dataType"
          label="数据类型"
          rules={[{ required: true, message: 'CRON表达式不能为空！' }]}
        >
          <Input name="dataType" disabled placeholder="请输入CRON表达式" />
        </Form.Item>
        <Form.Item
          name="alias"
          label="别名"
          rules={[{ required: true, message: '请输入字段别名！' }]}
        >
          <Input name="alias" placeholder="请输入字段别名" />
        </Form.Item>
        <Form.Item
          name="comment"
          label="备注信息"
        >
          <Input.TextArea name="comment" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateColumnForm;