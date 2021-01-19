import React, { useState } from 'react';
import { Tabs, message, } from 'antd';
import { AppleOutlined, } from '@ant-design/icons';
import style from './index.less';
import { ServeType, ServeGroupItem } from '@/services/serve.d';
import { saveGroup } from '@/services/serve';
import { codeIsOk } from '@/utils/utils';

import ServeList from './components/ServeList';
import ServeGroupForm from './components/ServeGroupForm';


const ServeManagePage: React.FC<{}> = () => {
  const [groupModalVisible, handleGroupModalVisible] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>(ServeType.REPORT);
  const [pIdValue, setPIdValue] = useState<number>();
  const [serveTypeValue, setServeTypeValue] = useState<string>();

  const handleSaveGroup = async (fields: ServeGroupItem) => {
    const hide = message.loading('正在保存分组信息');
    try {
      const { code, msg } = await saveGroup(fields);

      hide();
      if (codeIsOk(code)) {
        message.success('保存分组信息成功');
        handleGroupModalVisible(false);
        return true;
      } else {
        message.error(msg);
        return false;
      }
    } catch (error) {
      hide();
      message.error('保存分组信息失败请重试！');
      return false;
    }
  };

  const onChangeTab = (key: string) => {
    setActiveKey(key);
  }

  return (
    <div className={style.content}>
      <Tabs defaultActiveKey={activeKey} type="line" onChange={onChangeTab}>
        <Tabs.TabPane key={ServeType.REPORT} tab="报表管理">
          {
            activeKey === ServeType.REPORT ?
              <ServeList serveType={ServeType.REPORT}
                onAddGroupClick={(pId) => {
                  setServeTypeValue(ServeType.REPORT);
                  setPIdValue(pId);
                  handleGroupModalVisible(true);
                }}
              />
              :
              null
          }
        </Tabs.TabPane>
        <Tabs.TabPane key={ServeType.INTERFACE} tab={
          <span><AppleOutlined />接口管理</span>
        }>
          {
            activeKey === ServeType.INTERFACE ?
              <ServeList serveType={ServeType.INTERFACE}
                onAddGroupClick={(pId) => {
                  setServeTypeValue(ServeType.INTERFACE);
                  setPIdValue(pId);
                  handleGroupModalVisible(true);
                }}
              />
              :
              null
          }
        </Tabs.TabPane>
        <Tabs.TabPane key={ServeType.AGG} tab="聚合接口管理" >
          {
            activeKey === ServeType.AGG ?
              <ServeList serveType={ServeType.AGG}
                onAddGroupClick={(pId) => {
                  setServeTypeValue(ServeType.AGG);
                  setPIdValue(pId);
                  handleGroupModalVisible(true);
                }}
              />
              :
              null
          }
        </Tabs.TabPane>
        <Tabs.TabPane key={ServeType.LOV} tab="LOV管理">
          {
            activeKey === ServeType.LOV ?
              <ServeList serveType={ServeType.LOV}
                onAddGroupClick={(pId) => {
                  setServeTypeValue(ServeType.LOV);
                  setPIdValue(pId);
                  handleGroupModalVisible(true);
                }}
              />
              :
              null
          }
        </Tabs.TabPane>
      </Tabs>
      <ServeGroupForm
        formVisible={groupModalVisible}
        onCancel={() => {
          handleGroupModalVisible(false);
        }}
        editFlag={true}
        values={{
          id: 0,
          parentId: pIdValue,
          serveType: serveTypeValue
        }}
        onSubmit={(values) => {
          handleSaveGroup(values);
        }}
      />
    </div>
  );
}

export default ServeManagePage;