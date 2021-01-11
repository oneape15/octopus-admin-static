import React, { useEffect } from 'react';
import {
  Form, Input, Button, InputNumber, Radio, Row,
  Col, Divider
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Item } = Form;

export interface DataSourceFormProps {
  onCancel: (flag?: boolean, formVals?: API.DataSoureItem) => void;
  onSubmit: (values: API.DataSoureItem) => Promise<void>;
  formVisible: boolean;
  editFlag: boolean;
  values?: Partial<API.DataSoureItem>;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const defaultValue = {
  id: -1,
  type: 'MySQL',
  status: 0,
  sync: 0,
  readOnly: 0,
  canDdl: 0,
  timeout: 60,
  maxPoolSize: 10,
  minIdle: 1,
}

const DataSoureForm: React.FC<DataSourceFormProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(Object.assign({}, defaultValue, props.values));
  })

  const onFinish = (values: any) => {
    props.onSubmit(values);
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '24px' }}>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Divider orientation="left">基本信息</Divider>
        <Item name="id" hidden>
          <Input />
        </Item>
        <Item
          name="name"
          label="数据源名称"
          tooltip={{ title: '数据源名称必须唯一', icon: <InfoCircleOutlined /> }}
          extra="数据源名称全局唯一，方便数据源Schema信息拉取操作."
          rules={[
            {
              required: true,
              message: '数据源名称不能为空!',
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入数据源名称" />
        </Item>
        <Item
          name="type"
          label="数据源类型"
          rules={[{ required: true, message: '请选择数据类型' }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={"MySQL"}>MySQL</Radio.Button>
            <Radio.Button value={"PostgreSQL"}>PostgreSQL</Radio.Button>
            <Radio.Button value={"ODPS"}>ODPS</Radio.Button>
            <Radio.Button value={"Oracle"}>Oracle</Radio.Button>
          </Radio.Group>
        </Item>
        <Item
          name="jdbcUrl"
          label="URL"
          extra=""
          rules={[
            {
              required: true,
              message: '请输入数据源地址!',
            },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="请输入数据源地址" />
        </Item>
        <Item
          name="username"
          label="用户名"
          extra=""
          rules={[
            {
              required: true,
              message: '请输入登录名!',
            },
          ]}
          hasFeedback
        >
          <Input placeholder="" />
        </Item>
        <Item
          name="password"
          label="密码"
          extra=""
        >
          <Input.Password placeholder="请输入密码" />
        </Item>
        <Item
          name="testSql"
          label="检测SQL"
          extra=""
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="testSql"
                noStyle
              >
                <Input placeholder="SELECT 1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>检测</Button>
            </Col>
          </Row>
        </Item>
        <Divider orientation="left">连接池信息</Divider>
        <Item
          name="timeout"
          label="超时时间(s)"
          extra=""
        >
          <InputNumber min={1} max={180} />
        </Item>
        <Item
          name="maxPoolSize"
          label="最大连接数"
          extra=""
        >
          <InputNumber min={1} max={10} />
        </Item>
        <Item
          name="minIdle"
          label="最小空闲连接"
          extra=""
        >
          <InputNumber min={1} max={5} />
        </Item>
        <Divider orientation="left">同步设置</Divider>
        <Item
          name="sync"
          label="同步状态"
          rules={[{ required: true, message: '请选择同步状态' }]}
          extra="开启时，将根据CRON表达式定时同步数据源表结构信息"
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={0}>关闭</Radio.Button>
            <Radio.Button value={1}>开启</Radio.Button>
          </Radio.Group>
        </Item>
        <Item
          name="cron"
          label="CRON表达式"
          extra=""
        >
          <Input placeholder="0 15 * * * * ?" />
        </Item>
        <Divider orientation="left">操作权限设置</Divider>
        <Item
          name="readOnly"
          label="只读权限"
          extra="开启时，只允许数据查询。数据修改将失败~"
          rules={[{ required: true }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={0}>只读</Radio.Button>
            <Radio.Button value={1}>读写</Radio.Button>
          </Radio.Group>
        </Item>
        <Item
          name="canDdl"
          label="DDL操作"
          extra="开启后，可以对数据源进行表结构操作"
          rules={[{ required: true }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={0}>关闭</Radio.Button>
            <Radio.Button value={1}>开启</Radio.Button>
          </Radio.Group>
        </Item>
        <Divider orientation="left"></Divider>
        <Item
          name="comment"
          label="数据源描述信息"
          extra=""
        >
          <Input.TextArea placeholder="" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button type="default"
            style={{ margin: '0 24px' }}
            onClick={() => props.onCancel()}>Canncel</Button>
        </Item>
      </Form >
    </div >
  );
}

export default DataSoureForm;