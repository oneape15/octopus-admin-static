import React, { useState, useRef, useEffect } from 'react';
import { Layout, Select, List, Divider, Button, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { DatabaseOutlined, TableOutlined } from '@ant-design/icons';
import {
  getAllDataSource,
} from '@/services/datasource';
import {
  fetchTableList
} from '@/services/schema';
import { ItemProps } from '@/services/Global';
import style from './index.less';
import OptionDropdown, { BTNS_KEY } from '@/components/OptionDropdown';

const { Sider, Content } = Layout;
const SchemaManagePage: React.FC<{}> = () => {
  const [dataSourceList, setDataSourceList] = useState<ItemProps[]>();
  const [schemaList, setSchemaList] = useState<API.TableSchemaItem[]>();
  useEffect(() => {
    if (dataSourceList == undefined) {
      getAllDataSource()
        .then((apiBody) => {
          const { code, data, msg } = apiBody;
          if (code === 200 && data) {
            const options: ItemProps[] = [];
            data.forEach(ds => {
              options.push({
                label: ds.name,
                value: `${ds.id}`
              })
            });
            setDataSourceList(options);
          } else {
            message.error(msg);
          }
        })
        .catch((err) => {
          message.error('获取数据源列表失败', err);
        });
    }
  });

  return (
    <PageContainer>
      <Layout className={style.schemaLayout}>
        <Sider className={style.schemaSider} width={240}>
          <div>
            <DatabaseOutlined style={{ fontSize: '18px', color: '#08c' }} />
            <Select
              showSearch
              onChange={(value: string) => {
                fetchTableList(value).then((apiBody) => {
                  const { code, data, msg } = apiBody;
                  if (code === 200 && data) {
                    setSchemaList(data);
                  } else {
                    message.error(msg);
                  }
                }).catch((err) => {
                  message.error('获取表集合失败', err);
                })
              }}
              style={{ width: 180, marginLeft: 5 }}
              placeholder="选择一个数据源"
              options={dataSourceList}
            />
            <Divider orientation="left">表集合</Divider>
            <div className={style.schemaInfiniteContainer}>
              <List
                dataSource={schemaList}
                itemLayout="horizontal"
                style={{ height: '83vh', overflowY: 'scroll' }}
                size="small"
                bordered
                renderItem={item => (
                  <List.Item>
                    {/* <List.Item.Meta
                      avatar={<TableOutlined />}
                      title={item.name}
                      description={item.alias}
                    /> */}
                    {<div>
                      {item.name}
                      </div>}
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Sider>
        <Content>

        </Content>
      </Layout>
    </PageContainer>
  );
}

export default SchemaManagePage;