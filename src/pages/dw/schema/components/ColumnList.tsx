import React, { useState, useRef, useEffect } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

import { fetchColumnList } from '@/services/schema';
import { TableSchemaItem, TableColumnItem } from '@/services/schema.d';
import { message } from 'antd';

export interface ColumnListProps {
  schemaInfo: TableSchemaItem | undefined;
}
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const ColumnList: React.FC<ColumnListProps> = (props) => {
  const { schemaInfo } = props;
  const [columnList, setColumnList] = useState<TableColumnItem[]>();

  useEffect(() => {
    if (schemaInfo !== undefined) {
      fetchColumnList(schemaInfo?.datasourceId, schemaInfo?.name)
        .then((apiBody) => {
          const { code, data, msg } = apiBody;
          if (code === 200 && data) {
            setColumnList(data);
          } else {
            message.error(msg);
          }
        })
        .catch((err) => {
          message.error('获取字段列表失败', err);
        })
    }
  }, [schemaInfo]);
  return (
    <div>
      <div>{schemaInfo?.name} {schemaInfo?.alias}</div>
      <div>{schemaInfo?.comment}</div>
    </div>
  );
}

export default ColumnList;