import React from 'react';
import { TableOutlined } from '@ant-design/icons';

import style from '../index.less';
export interface SchemaListItemProps {
  name: string;
  heat?: number;
  comment?: string;
  onClick: (value: string) => void;
}

const SchemaItem: React.FC<SchemaListItemProps> = (props) => {
  const { name, comment, heat, onClick } = props;
  return (
    <div
      className={style.schemaItem}
      onClick={() => onClick(name)}
    >
      <div>{name}</div>
      <div>{comment}</div>
    </div>
  );
}

export default SchemaItem;