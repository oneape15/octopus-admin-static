import React, { useState, useRef, useEffect } from 'react';
import { Layout, Modal, Menu, Dropdown, Divider, message, Drawer } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import SourceTree from '@/components/SourceTree';
import { TreeItem } from '@/services/Global';
import { BTNS_KEY, BtnStatus } from '@/components/OptionDropdown';
import { genOrgTree, saveOrg, delOrg } from '@/services/org';
import { codeIsOk, requestIsOk } from '@/utils/utils';
import UpdateOrgForm from './components/UpdateOrgForm';
import { OrgItem } from '@/services/org.d';

import style from './index.less';

const { Sider, Content } = Layout;

/**
 * save org
 * @param fields 
 */
const handleSave = async (fields: OrgItem) => {
  const tag = fields.id > 0 ? '修改' : '添加';
  const hide = message.loading(`正在${tag}组织...`);
  try {
    const ret = await saveOrg({ ...fields });
    if (requestIsOk(ret)) {
      message.success(`${tag}成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error('添加组织失败，请重试!');
    return false;
  }
}

/**
 * delete role.
 * @param id 
 */
const handleDel = async (id: string) => {
  const hide = message.loading(`正在删除组织...`);
  try {
    const ret = await delOrg(id);
    hide();
    if (requestIsOk(ret)) {
      message.success(`删除成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error(`删除失败请重试！`);
    return false;
  }
}

const OrganizationManagePage: React.FC<{}> = () => {
  const [updateModalVisible, handUpdateModalVisible] = useState<boolean>(false);
  const [delModalVisible, handleDelModalVisible] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<TreeItem>();
  const [treeData, setTreeData] = useState<TreeItem[]>([]);

  useEffect(() => {
    refreshTree();
  }, []);

  /**
   * refresh tree
   */
  const refreshTree = () => {
    genOrgTree({
      addChildrenSize: true,
      addRootNode: false
    }).then((apiBody) => {
      const { code, data, msg } = apiBody;
      if (codeIsOk(code) && data) {
        setTreeData(data);
      } else {
        message.error(msg);
        setTreeData([])
      }
    }).catch(err => {
      message.error(err);
    })
  }

  return (
    <PageContainer>
      <Layout className={style.orgLayout}>
        <Sider className={style.orgSider} width={240}>
          <SourceTree
            treeData={treeData ? treeData : []}
            onSelect={(key) => {
              console.log(key, 'org----->')
            }}
            onBtnClick={(btnKey, node) => {
              switch (btnKey) {
                case BTNS_KEY.ADD:
                  setEditItem(node);
                  setEditFlag(false);
                  handUpdateModalVisible(true);
                  break;
                case BTNS_KEY.EDIT:
                  setEditItem(node);
                  setEditFlag(true);
                  handUpdateModalVisible(true);
                  break;
                case BTNS_KEY.DEL:
                  setEditItem(node);
                  handleDelModalVisible(true);
                  break;
              }
            }}
            genMoreBtns={(nodeKey, node) => {
              let menuKeys: BtnStatus[] = [];
              if (node.children && node.children.length > 0) {
                menuKeys = [
                  { key: BTNS_KEY.ADD, disabled: true, title: '新建' },
                  { key: BTNS_KEY.EDIT, disabled: true, title: '修改' },
                ];
              } else {
                menuKeys = [
                  { key: BTNS_KEY.ADD, disabled: true, title: '新建' },
                  { key: BTNS_KEY.EDIT, disabled: true, title: '修改' },
                  { key: BTNS_KEY.DEL, disabled: true, },
                ];
              }
              return menuKeys;
            }}
          />
        </Sider>
        <Content>

        </Content>
      </Layout>
      {updateModalVisible && (
        <UpdateOrgForm
          formVisible={updateModalVisible}
          editId={editItem?.key}
          editFlag={editFlag}
          onCancel={() => {
            handUpdateModalVisible(false);
            setEditItem(undefined);
            setEditFlag(false);
          }}
          onSubmit={async (value) => {
            const success = await handleSave(value);
            if (success) {
              handUpdateModalVisible(false);
              setEditFlag(false);
              setEditItem(undefined);
              refreshTree();
            }
          }}
        />
      )}
      {delModalVisible && (
        <Modal
          title="删除操作"
          visible={delModalVisible}
          okText="确认"
          cancelText="取消"
          width="320px"
          onCancel={() => {
            setEditItem(undefined);
            handleDelModalVisible(false);
          }}
          onOk={() => {
            const status = handleDel(editItem ? editItem.key : '-1');
            if (status) {
              setEditItem(undefined);
              handleDelModalVisible(false);
              refreshTree();
            };
          }}
        >
          <p>确认删除组织： {editItem?.title}</p>
        </Modal>
      )}
    </PageContainer>
  );
}

export default OrganizationManagePage;