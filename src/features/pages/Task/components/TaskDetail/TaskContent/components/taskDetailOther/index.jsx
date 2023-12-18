import React from "react";
import {
  GrMap,
  GrAlarm,
  GrUserManager,
  GrHostMaintenance,
  GrDocumentText,
} from "react-icons/gr";
import { GiCow, GiRingingBell } from "react-icons/gi";

const TaskDetailOther = ({
  taskData,
  formattedStartDate,
  formattedEndDate,
  formattedRepeatDate,
}) => {
  return (
    <>
      <h2>
        <GrMap /> Nơi thực hiện
      </h2>
      <div className="task-detail-item">
        <div className="task-detail-address">
          <h5>Địa điểm cụ thể</h5>
          {taskData.addressDetail === "" ? (
            <p>Chưa có địa điểm cụ thể</p>
          ) : (
            <p>{taskData.addressDetail}</p>
          )}
        </div>
      </div>
      <>
        <h2>
          <GrAlarm /> Thời gian
        </h2>
        <div className="task-detail-item">
          <div className="task-detail-text">
            <h5>
              Thời gian bắt đầu{" "}
              {taskData?.isStartLate ? (
                <span style={{ color: "red" }}>(Đã trễ)</span>
              ) : null}
            </h5>
            {taskData.startDate ? (
              <p>{formattedStartDate}</p>
            ) : (
              <p>Chưa có thời gian bắt đầu</p>
            )}
          </div>
          <div className="task-detail-text">
            <h5>
              Thời gian kết thúc{" "}
              {taskData?.isExpired ? (
                <span style={{ color: "red" }}>(Đã trễ)</span>
              ) : null}
            </h5>
            {taskData.startDate ? (
              <p>{formattedEndDate}</p>
            ) : (
              <p>Chưa có thời gian kết thúc</p>
            )}
          </div>
          {taskData.status === "Bản nháp" ||
          taskData.status === "Chuẩn bị" ? null : (
            <div className="task-detail-text">
              <h5>Thời gian dự kiến phải bỏ ra</h5>
              <p>
                {taskData.overallEffortHour} giờ {taskData.overallEfforMinutes}{" "}
                phút
              </p>
            </div>
          )}
        </div>
      </>
      <>
        <h2>
          <GrUserManager />
          Phụ trách
        </h2>
        <div className="task-detail-item">
          {taskData.managerName ? (
            <div className="task-detail-text">
              <h5>Người quản lý</h5>
              <p>{taskData.managerName}</p>
            </div>
          ) : null}
          <div className="task-detail-text">
            <h5>Người giám sát</h5>
            {taskData.supervisorName ? (
              <p>{taskData.supervisorName}</p>
            ) : (
              <p>Chưa có người giám sát</p>
            )}
          </div>
          <div className="task-detail-text">
            <h5>Người thực hiện</h5>
            {taskData.employeeName ? (
              <p>{taskData.employeeName}</p>
            ) : (
              <p>Chưa có người thực hiện</p>
            )}
          </div>
        </div>
      </>
      <>
        <h2>
          <GrHostMaintenance />
          Loại công việc
        </h2>
        <div className="task-detail-item">
          <div className="task-detail-text">
            <h5>Loại công việc</h5>
            {taskData.taskTypeName ? (
              <p>{taskData.taskTypeName}</p>
            ) : (
              <p>Chưa có loại công việc</p>
            )}
          </div>
          {taskData.materialName ? (
            <div className="task-detail-text">
              <h5>Dụng cụ</h5>
              <p>{taskData.materialName}</p>
            </div>
          ) : (
            <div className="task-detail-text">
              <h5>Dụng cụ</h5>
              <p>Chưa có dụng cụ</p>
            </div>
          )}
        </div>
      </>
      <>
        <h2>
          <GiRingingBell />
          Thông báo công việc
        </h2>
        <div className="task-detail-item">
          {taskData.remind === 0 ? (
            <div className="task-detail-text">
              <h5>Nhắc nhở trước khi bắt đầu</h5>
              <p>Không</p>
            </div>
          ) : (
            <div className="task-detail-text">
              <h5>Nhắc nhở trước khi bắt đầu</h5>
              <p>{taskData.remind} phút</p>
            </div>
          )}
          {taskData.isRepeat === true ? (
            <div className="task-detail-text">
              <h5>Lặp lại</h5>
              <p>Có</p>
            </div>
          ) : (
            <div className="task-detail-text">
              <h5>Lặp lại</h5>
              <p>Không</p>
            </div>
          )}
          {taskData.dateRepeate && taskData.dateRepeate.length > 0 ? (
            <div className="task-detail-text">
              <h5>Ngày lặp lại</h5>
              <p>{formattedRepeatDate.join(", ")}</p>
            </div>
          ) : (
            <div className="task-detail-text">
              <h5>Ngày lặp lại</h5>
              <p>Chưa có ngày lặp lại</p>
            </div>
          )}
        </div>
      </>
      {taskData.description ? (
        <>
          <h2>
            <GrDocumentText />
            Mô tả
          </h2>
          <div className="task-detail-item">
            <div className="task-detail-description">
              <h5>Mô tả chi tiết</h5>
              <p>{taskData.description}</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default TaskDetailOther;
