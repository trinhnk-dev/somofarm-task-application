import React from "react";
import { Button, Modal } from "antd";
import TaskContent from "./TaskContent";
import Evidence from "./Evidence";
import { useMobileMediaQuery } from "common/hooks/responsive";

const TaskDetail = ({
  visible,
  onCancel,
  taskData,
  handleRefuseTask,
  openEditTaskModal,
  closeEditTaskModal,
  openChangeDoneToDoingModal,
}) => {
  const isMobile = useMobileMediaQuery();
  return (
    <Modal
      title={
        taskData && taskData.status === "Hoàn thành" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Chi tiết công việc</p>
            <Button
              danger
              onClick={openChangeDoneToDoingModal}
              style={{ marginRight: "30px" }}
            >
              Yêu cầu làm lại
            </Button>
          </div>
        ) : (
          "Chi tiết công việc"
        )
      }
      open={visible}
      onCancel={onCancel}
      footer={isMobile ? <Button onClick={onCancel}>Đóng</Button> : null}
      width={1200}
      className="modal-detail"
      style={{ maxWidth: "90%", margin: "0 auto" }}
    >
      <TaskContent taskData={taskData} />
      {taskData && taskData.status !== "Từ chối" ? (
        <Evidence
          taskData={taskData}
          closeEditTaskModal={closeEditTaskModal}
        />
      ) : null}
    </Modal>
  );
};

export default TaskDetail;
