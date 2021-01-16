import React from 'react';
import { Card, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { TableSchemaItem } from '@/services/schema.d';

import table_png from '@/assets/table.png';
import heat_png from '@/assets/heat.png';
import quartz_png from '@/assets/quartz.png';
import tooltip_png from '@/assets/tooltip.png';

export interface SchemaDetailProps {
  value: TableSchemaItem | undefined;
  onEdit: () => void
}

const SchemaDetail: React.FC<SchemaDetailProps> = (props) => {
  const { value } = props;
  return (
    <Card loading={!value}>
      <Card.Meta
        avatar={
          <img style={{ width: 24 }} src={table_png} />
        }
        title={`${value?.name} ${value?.alias ? '(' + value.alias + ')' : ''}`}
        description={value?.comment}
      />
      <div style={{ display: 'flex', margin: '20px 0 0 40px' }}>
        <div style={{ marginRight: 24 }}>
          <img style={{ width: 14 }} src={heat_png} />
          <span>{value?.heat ? value.heat : '0'}</span>
          <Tooltip placement="top" title='使用热度'>
            <img style={{ width: 12 }} src={tooltip_png} />
          </Tooltip>
        </div>
        <div>
          <img style={{ width: 14 }} src={quartz_png} />
          <span>{value?.sync === 1 ? value.cron : '未设置'}</span>
        </div>
        <div style={{ margin: '0 24px', cursor: 'pointer' }} onClick={() => props.onEdit()}>
          <SettingOutlined key="setting" />
          <span style={{ margin: '0 6px' }}>设置</span>
        </div>
      </div>
    </Card>
  );
}

export default SchemaDetail;