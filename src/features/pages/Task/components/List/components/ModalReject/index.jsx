import { Button, Checkbox, Modal } from "antd";
import React from "react";

const ModalReject = ({
  selectedTaskId,
  rejectModalVisible,
  closeRejectModal,
  handleRefuseTask,
  isImportant,
  handleCheckImportant,
  isSubmit
}) => {
  return (
    <>
      {rejectModalVisible ? (
        <Modal
          title="Không chấp nhận"
          open={rejectModalVisible}
          onCancel={closeRejectModal}
          footer={[
            <Button onClick={closeRejectModal}>Hủy</Button>,
            <Button
              type="primary"
              danger
              onClick={() => handleRefuseTask(selectedTaskId)}
              disabled={isSubmit}
            >
              Đồng ý
            </Button>,
          ]}
        >
          <p>
            Nếu bạn từ chối thì công việc này sẽ quay lại trạng thái chuẩn bị{" "}
          </p>
          <p>Bạn sẽ không chấp nhận?</p>
          <Checkbox onChange={handleCheckImportant} checked={isImportant} style={{marginTop: "15px"}}>
            Công việc này không thể từ chối nữa
          </Checkbox>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalReject;
