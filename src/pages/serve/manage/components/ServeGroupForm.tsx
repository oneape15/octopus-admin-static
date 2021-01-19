import React, { useEffect, useState } from 'react';
import {
  Modal,
  Input,
  Form,
  TreeSelect,
  message
} from 'antd';

import { ServeGroupItem } from '@/services/serve.d';
import { genGroupTree } from '@/services/serve';
import { codeIsOk } from '@/utils/utils';

import { DataNode } from 'antd/lib/tree';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

export interface ServeGroupFormProps {
  onCancel: (flag?: boolean, formVals?: ServeGroupItem) => void;
  onSubmit: (values: ServeGroupItem) => void;
  formVisible: boolean;
  editFlag: boolean;
  values: Partial<ServeGroupItem>;
}

const ServeGroupForm: React.FC<ServeGroupFormProps> = (props) => {
  const { editFlag, values } = props;
  const [treeData, setTreeData] = useState<DataNode[]>();
  const [form] = Form.useForm();

  // reset form fields
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(Object.assign({}, props.values));
  });

  // fetch treeSelect data
  useEffect(() => {
    if (values.serveType) {
      genGroupTree({
        serveType: values.serveType,
        addRootNode: true,
      }).then(apiBody => {
        const { data, code, msg } = apiBody;
        if (codeIsOk(code)) {
          setTreeData(data);
        } else {
          message.warn(msg);
          setTreeData([]);
        }
      }).catch((err) => {
      })
    }
  }, [values]);
  const onChange = (value: any) => {
    console.log(value);
  }

  return (
    <Modal
      forceRender={true}
      width={440}
      destroyOnClose
      title={`${editFlag ? '修改' : '添加'}资源组`}
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
        <Form.Item name="serveType" hidden >
          <Input />
        </Form.Item>
        <Form.Item
          name="parentId"
          label="父节点"
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
          name="name"
          label="分组名"
          rules={[{ required: true, message: '请输入分组名称！' }]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          name="icon"
          label="图标"
        >
          <Input name="icon" />
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

export default ServeGroupForm;