import { Button, Modal } from "antd";
import React from "react";

const ModalDelete = ({
  selectedTaskId,
  deleteModalVisible,
  closeDeleteModal,
  handleDelete,
  isSubmit
}) => {
  return (
    <>
      {deleteModalVisible ? (
        <Modal
          title="Xác nhận xóa"
          open={deleteModalVisible}
          onCancel={closeDeleteModal}
          footer={[
            <Button onClick={closeDeleteModal}>Hủy</Button>,
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(selectedTaskId)}
              disabled={isSubmit}
            >
              Xóa công việc
            </Button>,
          ]}
        >
          <p>Nếu xóa thì công việc này sẽ mất vĩnh viễn! </p>
          <p>Bạn có chắc chắn sẽ xóa không?</p>
        </Modal>
      ) : null}
    </>
  );
};

export default ModalDelete;
