import { Button, Empty, Modal } from "antd";
import dayjs from "dayjs";
import React from "react";

function DisplayEffort({ effortVisible, handleEffortVisible, effort }) {
  return (
    <Modal
      title="Ghi nhận thời gian làm việc"
      open={effortVisible}
      onCancel={handleEffortVisible}
      footer={[
        <Button type="primary" onClick={handleEffortVisible}>
          Đóng
        </Button>,
      ]}
      className="effort-modal"
    >
      <div className="effort">
        {effort ? (
          effort.map((effortItem) => {
            return (
              <div className="effort-content">
                <div className="effort-header">
                  <div className="effort-count">
                    <span style={{ textDecoration: "none", color: "red" }}>
                      *{" "}
                    </span>
                    <span>{effortItem.employeeName}</span>{" "}
                  </div>
                </div>

                <div className="effort-container" key={effortItem.employeeId}>
                  <div className="effort-item">
                    <p>Mã nhân viên: {effortItem.employeeCode}</p>
                    <p>
                      Thời gian: {effortItem.totalActualEffortHour} giờ{" "}
                      {effortItem.totalActualEfforMinutes} phút
                    </p>
                    <p>
                      Ngày thực hiện:{" "}
                      {dayjs(effortItem.daySubmit).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Empty description="Không có người thực hiện để ghi nhận" />
        )}
      </div>
    </Modal>
  );
}

export default DisplayEffort;
