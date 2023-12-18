import { Button, Modal } from "antd";
import React from "react";

const CloneTask = ({
  selectedTaskId,
  cloneTaskModalVisible,
  closeCloneTaskModal,
  handleCloneTask,
  isSubmit
}) => {
  return (
    <>
      {cloneTaskModalVisible ? (
        <Modal
          title="Tạo bản sao"
          open={cloneTaskModalVisible}
          onCancel={closeCloneTaskModal}
          footer={[
            <Button onClick={closeCloneTaskModal}>Hủy</Button>,
            <Button
              type="primary"
              onClick={() => handleCloneTask(selectedTaskId)}
              disabled={isSubmit}
            >
              Tạo bản sao
            </Button>,
          ]}
        >
          <p>Bản sao của công việc này sẽ được tạo ở trạng thái "Bản nháp"</p>
        </Modal>
      ) : null}
    </>
  );
};

export default CloneTask;
