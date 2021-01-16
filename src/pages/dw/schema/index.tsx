import React, { useState, useEffect } from 'react';
import { Layout, Select, List, Divider, message, } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { DatabaseOutlined } from '@ant-design/icons';
import {
  getAllDataSource,
} from '@/services/datasource';
import {
  fetchTableList,
  fetchColumnList,
  changeTableInfo,
  changeColumnInfo,
} from '@/services/schema';
import { TableColumnItem, TableSchemaItem } from '@/services/schema.d';
import { ItemProps } from '@/services/Global';
import style from './index.less';
import SchemaDetail from './components/SchemaDetail';
import SchemaItem from './components/SchemaItem';
import ColumnList from './components/ColumnList';
import UpdateSchemaForm from './components/UpdateSchemaForm';
import UpdateColumnForm from './components/UpdateColumnForm';

const { Sider, Content } = Layout;

const handleUpdateSchema = async (fields: TableSchemaItem) => {
  const hide = message.loading('正在修改表信息');
  try {
    await changeTableInfo(fields);
    hide();

    message.success('修改表信息成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改表信息失败请重试！');
    return false;
  }
};

const handleUpdateColumn = async (fields: TableColumnItem) => {
  const hide = message.loading('正在修改字段信息');
  try {
    await changeColumnInfo(fields);
    hide();

    message.success('修改字段信息成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改字段信息失败请重试！');
    return false;
  }
};

const SchemaManagePage: React.FC<{}> = () => {
  const [dataSourceList, setDataSourceList] = useState<ItemProps[]>();
  const [schemaList, setSchemaList] = useState<TableSchemaItem[]>();
  const [columnList, setColumnList] = useState<TableColumnItem[]>([]);
  const [schemaValue, setSchemaValue] = useState<TableSchemaItem>();
  const [columnValue, setColumnValue] = useState<TableColumnItem>();
  const [updateSchemaModalVisible, handleUpdateSchemaModalVisible] = useState<boolean>(false);
  const [updateColumnModalVisible, handleUpdateColumnModalVisible] = useState<boolean>(false);

  const getColumnList = async (dsId: number, tableName: string) => {
    try {
      const apiBody = await fetchColumnList(dsId, tableName);
      const { code, data, msg } = apiBody;
      if (code === 200 && data) {
        message.success('获取字段信息成功');
        setColumnList(data);
      } else {
        message.error(msg);
        setColumnList([]);
      }
    } catch (error) {
      message.error('获取字段信息失败请重试！');
      setColumnList([]);
    }
  }

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

  useEffect(() => {
    if (!schemaValue) {
      return;
    }

    const { datasourceId, name } = schemaValue;
    getColumnList(datasourceId, name);
  }, [schemaValue]);

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
                    <SchemaItem
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
          <SchemaDetail
            value={schemaValue}
            onEdit={() => {
              handleUpdateSchemaModalVisible(true);
            }}
          />
          <Divider orientation="left">字段信息集</Divider>
          <ColumnList
            values={columnList}
            onEdit={(value) => {
              handleUpdateColumnModalVisible(true);
              setColumnValue(value);
            }}
          />
        </Content>
      </Layout>
      {updateSchemaModalVisible && schemaValue ? (
        <UpdateSchemaForm
          updateModalVisible={updateSchemaModalVisible}
          values={schemaValue}
          onSubmit={async (value) => {
            const success = await handleUpdateSchema(value);
            if (success) {
              handleUpdateSchemaModalVisible(false);
              setSchemaValue(value);
            }
          }}
          onCancel={() => {
            handleUpdateSchemaModalVisible(false);
          }}
        />
      ) : null}
      {updateColumnModalVisible && columnValue ? (
        <UpdateColumnForm
          updateModalVisible={updateColumnModalVisible}
          values={columnValue}
          onSubmit={async (value) => {
            const success = await handleUpdateColumn(value);
            if (success) {
              handleUpdateColumnModalVisible(false);
              if (schemaValue) {
                getColumnList(schemaValue?.datasourceId, schemaValue?.name);
              }
            }
          }}
          onCancel={() => {
            handleUpdateColumnModalVisible(false);
          }}
        />
      ) : null}
    </PageContainer>
  );
}

export default SchemaManagePage;