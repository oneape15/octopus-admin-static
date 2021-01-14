import React, { useState, useEffect } from 'react';
import { Layout, Select, List, Divider, message, } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { DatabaseOutlined } from '@ant-design/icons';
import {
  getAllDataSource,
} from '@/services/datasource';
import {
  fetchTableList
} from '@/services/schema';
import { TableSchemaItem } from '@/services/schema.d';
import { ItemProps } from '@/services/Global';
import style from './index.less';
import SchemaListItem from './components/SchemaListItem';
import ColumnList from './components/ColumnList';

const { Sider, Content } = Layout;
const SchemaManagePage: React.FC<{}> = () => {
  const [dataSourceList, setDataSourceList] = useState<ItemProps[]>();
  const [schemaList, setSchemaList] = useState<TableSchemaItem[]>();
  const [schemaValue, setSchemaValue] = useState<TableSchemaItem>();
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
                    setSchemaValue(data && data.length > 0 ? data[0] : undefined);
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
            <Divider orientation="left">{`表集合(${schemaList !== undefined ? schemaList.length : 0}张)`}</Divider>
            <div className={style.schemaInfiniteContainer}>
              <List
                dataSource={schemaList}
                itemLayout="horizontal"
                style={{ height: '83vh', overflowY: 'scroll' }}
                size="small"
                bordered
                renderItem={item => (
                  <List.Item className={schemaValue !== undefined && schemaValue.name === item.name && style.schemaItemSelected}>
                    <SchemaListItem
                      name={item.name}
                      heat={item.heat}
                      comment={item.alias}
                      onClick={(value) => {
                        setSchemaValue(schemaList?.filter(s => {
                          return s.name === value
                        })[0])
                      }}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Sider>
        <Content className={style.content}>
          <ColumnList
            schemaInfo={schemaValue}
          />
        </Content>
      </Layout>
    </PageContainer>
  );
}

export default SchemaManagePage;