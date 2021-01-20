import React, { useEffect } from 'react';
import { Modal, Radio, Input, Form } from 'antd';

import { TableSchemaItem } from '@/services/schema.d';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

export interface UpdateSchemaFormProps {
  onCancel: (flag?: boolean, formVals?: TableSchemaItem) => void;
  onSubmit: (values: TableSchemaItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableSchemaItem>;
}

const UpdateSchemaForm: React.FC<UpdateSchemaFormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(Object.assign({}, { async: 1 }, props.values));
  });

  return (
    <Modal
      width={640}
      destroyOnClose
      title="Schema信息修改"
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
          label="表名"
        >
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item
          name="alias"
          label="别名"
          rules={[{ required: true, message: '请输入别名！' }]}
        >
          <Input name="alias" />
        </Form.Item>
        <Form.Item
          label="同步任务"
          name="sync"
          rules={[{ required: true, message: '请输入！' }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={0}>关闭</Radio.Button>
            <Radio.Button value={1}>开启</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="cron"
          label="CRON表达式"
          rules={[{ required: false, message: 'CRON表达式不能为空！' }]}
        >
          <Input name="cron" placeholder="请输入CRON表达式" />
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

export default UpdateSchemaForm;