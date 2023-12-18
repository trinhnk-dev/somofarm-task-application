import { Button, Modal } from "antd";
import React from "react";

const ChangePendingToDoing = ({
  selectedTaskId,
  pendingToDoingModalVisible,
  closePendingToDoingModal,
  handleChangePendingAndCancelToDoing,
  isSubmit,
}) => {
  return (
    <>
      {pendingToDoingModalVisible ? (
        <Modal
          title="Chuyển sang thực hiện"
          open={pendingToDoingModalVisible}
          onCancel={closePendingToDoingModal}
          footer={[
            <Button onClick={closePendingToDoingModal}>Hủy</Button>,
            <Button
              type="primary"
              onClick={() =>
                handleChangePendingAndCancelToDoing(selectedTaskId.id)
              }
              disabled={isSubmit}
            >
              Chuyển sang thực hiện
            </Button>,
          ]}
        >
          <p>Nếu chuyển sang thực hiện thì công việc này sẽ được tiếp tục</p>
          <p>Bạn sẽ chuyển chứ?</p>
        </Modal>
      ) : null}
    </>
  );
};

export default ChangePendingToDoing;
