import { Button, Modal } from "antd";
import React from "react";

const ModalClose = ({
  selectedTaskId,
  closeModalVisible,
  closeCloseModal,
  handleChangeDoneToCloseTask,
  isSubmit
}) => {
  return (
    <>
      {closeModalVisible ? (
        <Modal
          title="Xác nhận đóng"
          open={closeModalVisible}
          onCancel={closeCloseModal}
          footer={[
            <Button onClick={closeCloseModal}>Hủy</Button>,
            <Button
              type="primary"
              danger
              onClick={() => handleChangeDoneToCloseTask(selectedTaskId)}
              disabled={isSubmit}
            >
              Đóng công việc
            </Button>,
          ]}
        >
          <p>Nếu đóng thì công việc này sẽ không còn thao tác được nữa! </p>
          <p>Bạn chắc chắn sẽ đóng chứ?</p>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalClose;
