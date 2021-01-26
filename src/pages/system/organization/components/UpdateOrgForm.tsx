import React, { useState, useEffect } from 'react';
import {
  Modal,
  Input,
  Form,
  TreeSelect,
  message,
} from 'antd';
import { DataNode } from 'antd/lib/tree';
import { genOrgTree, getOrg } from '@/services/org';
import { codeIsOk } from '@/utils/utils';
import { OrgItem } from '@/services/org.d';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

export interface OrgFormProps {
  onCancel: (flag?: boolean, formVals?: OrgItem) => void;
  onSubmit: (values: OrgItem) => void;
  formVisible: boolean;
  editFlag: boolean;
  editId?: string;
}

const UpdateOrgForm: React.FC<OrgFormProps> = (props) => {
  const [treeData, setTreeData] = useState<DataNode[]>();
  const { editFlag, editId } = props;
  const [form] = Form.useForm();

  const getEditOrgInfo = (orgId: string) => {
    getOrg(orgId).then(apiBody => {
      const { code, data, msg } = apiBody;
      if (codeIsOk(code)) {
        form.setFieldsValue(Object.assign({}, { type: 0 }, data));
      } else {
        message.error(msg);
      }
    }).catch((err) => {
      message.error(err);
    });
  }
  useEffect(() => {
    form.resetFields();
    if (editId && editId !== null) {
      if (editFlag) {
        getEditOrgInfo(editId);
      } else {
        form.setFieldsValue({ type: 0, parentId: editId })
      }
    } else {
      form.setFieldsValue({ type: 0 });
    }
  }, []);

  useEffect(() => {
    let disabledKeys: string[] = [];
    if (editId && editFlag) {
      disabledKeys.push(editId);
    }
    genOrgTree({
      addChildrenSize: true,
      addRootNode: true,
      disabledKeys,
    }).then((apiBody) => {
      const { code, data, msg } = apiBody;
      if (codeIsOk(code) && data) {
        setTreeData(data);
      } else {
        message.error(msg);
        setTreeData([])
      }
    }).catch(err => {
      message.error(err);
    })
  }, [])

  const onChange = (value: any) => {
    console.log(value);
  }

  return (
    <Modal
      width={440}
      destroyOnClose
      title={`${editFlag ? '修改' : '添加'}组织`}
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
          name="parentId"
          label="上级部门"
          rules={[{ required: true, message: '请选择上级部门！' }]}
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
          label="组织名称"
          rules={[{ required: true, message: '请输入组织名称！' }]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          name="code"
          label="组织编码"
          rules={[{ required: true, message: '请输入组织编码！' }]}
        >
          <Input name="code" />
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

export default UpdateOrgForm;