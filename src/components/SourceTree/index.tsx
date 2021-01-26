import React, { useState } from 'react';
import { Tree, Input, Empty, Button } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { TreeItem } from '@/services/Global.d';

import OptionDropdown, { BtnStatus } from '@/components/OptionDropdown';

import style from './index.less';
import { DataNode } from 'antd/lib/tree';

export interface SourceTreeProps {
  needSearch?: boolean;
  treeData: TreeItem[];
  onAddClick?: (pId: number) => void;
  onSelect?: (key: string) => void;
  onBtnClick: (btnKey: string, node: TreeItem) => void;
  genMoreBtns: (nodeKey: string, node: TreeItem) => BtnStatus[];
}

const SourceTree: React.FC<SourceTreeProps> = (props) => {
  const [expandedKeys, setExpandedKeys] = useState<string[] | number[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false);
  const { treeData, needSearch, onAddClick, onSelect, onBtnClick, genMoreBtns } = props;

  const onExpand = (expandedKeys: string[] | number[]) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }

  const onChange = (e: any) => {
    const { value } = e.target;
    console.log(value);
  }

  const renderTitle = (item: TreeItem) => {
    let menuKeys: BtnStatus[] = genMoreBtns(item.key, item);
    let showMoreBtn = menuKeys !== undefined && menuKeys !== null && menuKeys.length > 0;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', }}>
        <div style={{ marginRight: 20 }}>{item.title}</div>
        <div className={style.itemBtn} style={{ display: showMoreBtn ? 'block' : 'none' }} >
          <OptionDropdown
            menuKeys={menuKeys}
            dataKey={item.key}
            onItemClick={(dataKey, btnKey) => {
              onBtnClick(btnKey, item);
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
        style={{ marginBottom: 8, display: needSearch !== undefined && needSearch ? 'block' : 'none' }}
        placeholder="检索"
        onChange={onChange} />
      <Tree
        style={{ display: treeData && treeData.length > 0 ? 'block' : 'none' }}
        showLine
        showIcon={false}
        switcherIcon={<DownOutlined />}
        onExpand={(expandedKeys, info) => {
          let keys: string[] = [];
          expandedKeys.forEach(k => {
            keys.push(k.toString());
          })
          onExpand(keys);
        }}
        onSelect={(selectedKeys, info) => {
          if (onSelect && selectedKeys && selectedKeys.length > 0) {
            onSelect(selectedKeys[0].toString());
          }
        }}
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
            暂无数据
          </span>
        }
      >
        <Button type="primary"
          onClick={() => {
            if (onAddClick) {
              onAddClick(0);
            }
          }}
        >
          <PlusOutlined />
        </Button>
      </Empty>
    </div>
  );
}

export default SourceTree;