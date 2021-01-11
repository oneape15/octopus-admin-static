import React from 'react';
import { Modal } from 'antd';

interface CreateUserFormProps {
  modalVisible: boolean;
  onCancel: ()=> void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = (props) => {
  const {modalVisible , onCancel} = props;

  return (
    <Modal
      destroyOnClose
      title="创建用户"
      width={420}
      visible={modalVisible}
      onCancel={() =>onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateUserForm;