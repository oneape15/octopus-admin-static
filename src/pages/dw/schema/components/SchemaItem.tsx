import React from 'react';
import { TableOutlined } from '@ant-design/icons';

import style from '../index.less';
import { TableSchemaItem } from '@/services/schema.d';

export interface SchemaListItemProps {
  value: TableSchemaItem;
  onClick: (value: TableSchemaItem) => void;
}

const SchemaItem: React.FC<SchemaListItemProps> = (props) => {
  const { value, onClick } = props;
  return (
    <div
      className={style.schemaItem}
      onClick={() => onClick(value)}
    >
      <div>{value.name}</div>
      <div className={style.schemaItemAlias}>{value.alias}</div>
    </div>
  );
}

export default SchemaItem;