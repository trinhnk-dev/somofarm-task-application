import React from "react";
import { Button, Empty, Modal } from "antd";

function Activity({
  activityModalVisible,
  handleActivityModalVisible,
  activity,
  editingTask,
}) {
  return (
    <Modal
      title={editingTask ? `#${editingTask.code} - ${editingTask.name}` : null}
      open={activityModalVisible}
      onCancel={handleActivityModalVisible}
      width={900}
      footer={[
        <Button type="primary" onClick={handleActivityModalVisible}>
          Đóng
        </Button>,
      ]}
      className="activity-modal"
    >
      <div className="activity">
        {activity && activity.data ? (
          activity.data.map((activityItem) => {
            return (
              <div className="activity-content">
                <div className="activity-header">
                  <div className="activity-count">
                    <span style={{ color: "#8EAD48" }}>
                      #{activityItem.code}
                    </span>{" "}
                  </div>
                </div>
                <div className="activity-container" key={activityItem.employeeId}>
                  <div className="activity-item">
                    <p>
                      <span>Tên:</span> {activityItem.name}
                    </p>
                    <p>
                      <span>Người thực hiện:</span> {activityItem.employeeName}
                    </p>
                    <p>
                      <span>Thời gian làm việc:</span>{" "}
                      {activityItem.actualEffortHour} giờ{" "}
                      {activityItem.actualEfforMinutes} phút
                    </p>
                    {activityItem.description ? (
                      <p>
                        <span>Mô tả:</span> {activityItem.description}
                      </p>
                    ) : (
                      <p>
                        <span>Mô tả:</span> Chưa có mô tả
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{width: "100%", display: "flex", justifyContent: "center" }}>
          <Empty  description="Chưa có ghi nhận hoạt động nào" />
          </div>
          
        )}
      </div>
    </Modal>
  );
}

export default Activity;
