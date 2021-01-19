import React, { useState } from 'react';
import { Tree, Input, Empty, Button } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { TreeItem } from '@/services/Global.d';

import OptionDropdown, { BTNS_KEY, BtnStatus } from '@/components/OptionDropdown';

import style from './index.less';
import { DataNode } from 'antd/lib/tree';

const { TreeNode } = Tree;

export interface SourceTreeProps {
  treeData: TreeItem[];
  onAddClick: (pId: number) => void;
}

const SourceTree: React.FC<SourceTreeProps> = (props) => {
  const [expandedKeys, setExpandedKeys] = useState<string[] | number[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false);
  const { treeData } = props;

  const onExpand = (expandedKeys: string[] | number[]) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }

  const onChange = (e: any) => {
    const { value } = e.target;
    console.log(value);
  }

  const renderTitle = (item: TreeItem) => {
    let menuKeys: BtnStatus[] = [];

    let showMoreBtn = true;
    if (item.key === '-1' || item.key === '-2') {
      showMoreBtn = false;
    } else if (item.key === '0') {
      menuKeys.push({ key: BTNS_KEY.ADD, disabled: true, title: '新建' });
    } else {
      menuKeys = [
        { key: BTNS_KEY.ADD, disabled: true, title: '新建' },
        { key: BTNS_KEY.EDIT, disabled: true, title: '重命名' },
        { key: BTNS_KEY.MOVE, disabled: true, title: '移动到' },
        { key: BTNS_KEY.DEL, disabled: true, },
      ];
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', }}>
        <div style={{ marginRight: 20 }}>{item.title}</div>
        <div className={style.itemBtn} style={{ display: showMoreBtn ? 'block' : 'none' }} >
          <OptionDropdown
            menuKeys={menuKeys}
            dataKey={item.key}
            onItemClick={(key, dataKey) => {
              console.log(key, dataKey);
            }}
          />
        </div>
      </div>
    );
  }

  const renderTree = (data: TreeItem[]): DataNode[] => {
    return data.map(item => {
      if (!item.children) {
        return {
          key: item.key,
          title: renderTitle(item),
        };
      } else {
        return {
          key: item.key,
          title: renderTitle(item),
          children: renderTree(item.children),
        };
      }
    });
  }

  return (
    <div>
      <Input.Search
        style={{ marginBottom: 8 }}
        placeholder="检索"
        onChange={onChange} />
      <Tree
        style={{ display: treeData && treeData.length > 0 ? 'block' : 'none' }}
        showLine
        showIcon={false}
        switcherIcon={<DownOutlined />}
        onExpand={(keys: string[] | number[], info) => onExpand(keys)}
        expandedKeys={expandedKeys}
        treeData={renderTree(treeData)}
        autoExpandParent={autoExpandParent}
      />
      <Empty
        style={{ marginTop: 30, display: treeData && treeData.length > 0 ? 'none' : 'block' }}
        imageStyle={{
          height: 60
        }}
        description={
          <span>
            暂无资源数据
          </span>
        }
      >
        <Button type="primary"
          onClick={() => {
            props.onAddClick(0);
          }}
        >
          <PlusOutlined />
        </Button>
      </Empty>
    </div>
  );
}

export default SourceTree;