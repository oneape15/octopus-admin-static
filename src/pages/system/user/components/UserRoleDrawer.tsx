import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Statistic,
  Checkbox,
  Divider,
  message,
  Button,
  Modal,
} from 'antd';

import { CheckGroupOption } from '@/services/Global.d';
import { getAllRole, getRoleByUserId } from '@/services/role';
import { saveUserRole } from '@/services/user';
import { requestIsOk, codeIsOk } from '@/utils/utils';

const CheckboxGroup = Checkbox.Group;

export interface UserRoleDrawerProps {
  onColse: () => void;
  drawerVisible: boolean;
  userId: number;
}

/**
 * save user role list
 * @param userId 
 * @param checkRoleIds 
 */
const handUserRole = async (userId: number, checkRoleIds: string[]) => {
  const hide = message.loading('正在保存角色列表...');
  try {
    const ret = await saveUserRole({ id: userId, roleIds: checkRoleIds });
    hide();
    if (requestIsOk(ret)) {
      message.success(`保存成功`);
      return true;
    } else {
      message.error(ret.msg);
      return false;
    }
  } catch (error) {
    hide();
    message.error('保存失败, 请重试');
    return false;
  }
}

const UserRoleDrawer: React.FC<UserRoleDrawerProps> = (props) => {
  const [checkRoleIds, setCheckRoleIds] = useState<string[]>([]);
  const [plainOptions, setPlaiOptions] = useState<CheckGroupOption[]>([]);
  const [modalVisible, handleModalVisible] = useState<boolean>(false);

  const onChange = (list: string[]) => {
    setCheckRoleIds(list);
  };

  useEffect(() => {
    if (props.userId > 0) {
      getRoleByUserId(props.userId).then((apiBody) => {
        const { code, data, msg } = apiBody;
        if (codeIsOk(code) && data) {
          const list: string[] = [];
          data.forEach(role => {
            list.push(`${role.id}`)
          });
          setCheckRoleIds(list);
        } else {
          setCheckRoleIds([]);
          message.error(msg);
        }
      }).catch((err) => {
        message.error(err);
        setCheckRoleIds([]);
      });
    }
  }, [props.userId]);

  useEffect(() => {
    getAllRole().then(apiBody => {
      const { code, data, msg } = apiBody;
      if (codeIsOk(code) && data) {
        const options: CheckGroupOption[] = [];
        data.forEach(role => {
          options.push({
            label: role.name,
            value: `${role.id}`
          })
        });
        setPlaiOptions(options);
      } else {
        setPlaiOptions([]);
        message.error(msg);
      }
    }).catch((err) => {
      message.error(err);
      setPlaiOptions([]);
    })
  }, [props.userId])

  return (
    <Drawer
      title="用户角色设置"
      placement="right"
      closable={false}
      onClose={props.onColse}
      visible={props.drawerVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={() => props.onColse()} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button type="primary"
            onClick={() => handleModalVisible(true)}
          >
            提交
          </Button>
        </div>
      }
    >
      <Statistic
        title="拥有角色"
        value={checkRoleIds.length}
        suffix={' / ' + plainOptions.length} />
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkRoleIds} onChange={onChange} />
      {/* save modal view */}
      {modalVisible && (
        <Modal
          title="询问框"
          centered
          visible={modalVisible}
          width={220}
          onOk={() => {
            const state = handUserRole(props.userId, checkRoleIds);
            if (state) {
              handleModalVisible(false);
              props.onColse();
            }
          }}
          onCancel={() => handleModalVisible(false)}
        >
          <p>确定提交？</p>
        </Modal>
      )}
    </Drawer>
  );
}

export default UserRoleDrawer;
