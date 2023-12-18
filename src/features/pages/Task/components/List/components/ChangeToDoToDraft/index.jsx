import { Button, Modal } from "antd";
import React from "react";

const ChangeToDoToDraft = ({
  toDoToDraftModalVisible,
  closeToDoToDraftModal,
  isSubmit,
  handleChangeToDoToDraft,
  selectedTaskId,
}) => {
  return (
    <>
      {toDoToDraftModalVisible ? (
        <Modal
          title="Chuyển sang nháp"
          open={toDoToDraftModalVisible}
          onCancel={closeToDoToDraftModal}
          footer={[
            <Button onClick={closeToDoToDraftModal}>Hủy</Button>,
            <Button
              type="primary"
              onClick={() => handleChangeToDoToDraft(selectedTaskId)}
              disabled={isSubmit}
            >
              Chuyển
            </Button>,
          ]}
        >
          <p>Công việc này sẽ được chuyển sang trạng thái bản nháp! </p>
        </Modal>
      ) : null}
    </>
  );
};

export default ChangeToDoToDraft;
