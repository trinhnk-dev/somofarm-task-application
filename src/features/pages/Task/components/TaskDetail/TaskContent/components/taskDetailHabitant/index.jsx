import React from "react";
import {
  GrMap,
  GrAlarm,
  GrUserManager,
  GrHostMaintenance,
  GrDocumentText,
} from "react-icons/gr";
import { GiCow, GiFruitTree, GiRingingBell } from "react-icons/gi";

const TaskDetailHabitant = ({
  taskData,
  formattedStartDate,
  formattedEndDate,
  formattedRepeatDate,
}) => {
  return (
    <>
      <h2>
        <GrMap color="white" /> Nơi thực hiện
      </h2>
      <div className="task-detail-item">
        <div className="task-detail-text">
          <h5>Khu vực</h5>
          {taskData.areaName ? (
            <p>{taskData.areaName}</p>
          ) : (
            <p>Chưa có khu vực</p>
          )}
        </div>
        <div className="task-detail-text">
          <h5>Vùng</h5>
          {taskData.zoneName ? <p>{taskData.zoneName}</p> : <p>Chưa có vùng</p>}
        </div>
        {taskData.isPlant === true ? (
          <div className="task-detail-text">
            <h5>Vườn</h5>
            {taskData.fieldName ? (
              <p>{taskData.fieldName}</p>
            ) : (
              <p>Chưa có vườn</p>
            )}
          </div>
        ) : taskData.isPlant === false ? (
          <div className="task-detail-text">
            <h5>Chuồng</h5>
            {taskData.fieldName ? (
              <p>{taskData.fieldName}</p>
            ) : (
              <p>Chưa có chuồng</p>
            )}
          </div>
        ) : null}
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
      {taskData.isSpecific && taskData.isPlant ? (
        <>
          <h2>
            <GiFruitTree />
            Đối tượng
          </h2>
          <div className="task-detail-item">
            <>
              <div className="task-detail-text">
                <h5>Cây trồng</h5>
                {taskData.plantName ? (
                  <p>{taskData.plantName}</p>
                ) : (
                  <p>Chưa có cây trồng</p>
                )}
              </div>

              <div className="task-detail-text">
                <h5>Mã cây trồng</h5>
                {taskData.externalId ? (
                  <p>{taskData.externalId}</p>
                ) : (
                  <p>Chưa có mã cây trồng</p>
                )}
              </div>
            </>
          </div>
        </>
      ) : taskData.isSpecific && !taskData.isPlant ? (
        <>
          <h2>
            <GiCow />
            Đối tượng
          </h2>
          <div className="task-detail-item">
            <>
              <div className="task-detail-text">
                <h5>Con vật</h5>
                {taskData.liveStockName ? (
                  <p>{taskData.liveStockName}</p>
                ) : (
                  <p>Chưa có con vật</p>
                )}
              </div>

              <div className="task-detail-text">
                <h5>Mã con vật</h5>
                {taskData.externalId ? (
                  <p>{taskData.externalId}</p>
                ) : (
                  <p>Chưa có mã con vật</p>
                )}
              </div>
            </>
          </div>
        </>
      ) : null}

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

export default TaskDetailHabitant;
