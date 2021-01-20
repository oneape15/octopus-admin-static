import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { TableColumnItem } from '@/services/schema.d';
import OptionDropdown, { BTNS_KEY } from '@/components/OptionDropdown';

export interface ColumnListProps {
  values: TableColumnItem[];
  onEdit: (value: TableColumnItem) => void;
}

const ColumnList: React.FC<ColumnListProps> = (props) => {
  const columns: ProColumns<TableColumnItem>[] = [
    { title: '字段名', dataIndex: 'name', },
    { title: '别名', dataIndex: 'alias', },
    { title: '字段类型', dataIndex: 'dataType', },
    {
      title: '字段属性', dataIndex: 'classify', valueEnum: {
        0: { text: '普通' },
        1: { text: '主键' },
        2: { text: '外键' },
      }
    },
    { title: '热度', dataIndex: 'heat', },
    {
      title: '状态', dataIndex: 'status', valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '已删除', status: 'Default' },
      }
    },
    { title: '备注', dataIndex: 'comment', ellipsis: true, },
    {
      title: '操作', dataIndex: 'option', align: 'center', valueType: 'option',
      render: (_, record) => (
        <OptionDropdown
          menuKeys={[
            { key: BTNS_KEY.EDIT, disabled: true, },
          ]}
          dataKey={record.id}
          onItemClick={(key, id) => {
            switch (key) {
              case BTNS_KEY.EDIT:
                props.onEdit(record);
                break;
            }
          }} />
      )
    }
  ];

  return (
    <ProTable<TableColumnItem>
      rowKey="id"
      columns={columns}
      dataSource={props.values ? props.values : []}
      search={false}
      options={false}
      pagination={{
        pageSize: 10,
      }}
    />
  )
}

export default ColumnList;