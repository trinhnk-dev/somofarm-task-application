import { Badge, Calendar, Modal, Collapse, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { useMobileMediaQuery } from "common/hooks/responsive";
import { useDispatch, useSelector } from "react-redux";
import { getTaskForCalendar } from "features/slice/task/taskForCalendarSlice";
import { getMemberById } from "features/slice/user/memberSlice";
import { authServices } from "services/authServices";
import { WalletOutlined } from "@ant-design/icons";
import ClockLoader from "react-spinners/ClockLoader";
import dayjs from "dayjs";

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

function Schedule() {
  const { Panel } = Collapse;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const dispatch = useDispatch();

  const taskForCalendarData = useSelector(
    (state) => state.taskForCalendar.data
  );

  const loading = useSelector((state) => state.taskForCalendar.loading);

  useEffect(() => {
    dispatch(getTaskForCalendar(authServices.getUserId()));
    dispatch(getMemberById(authServices.getUserId()));
  }, [dispatch]);

  const getListData = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const tasksForDate = taskForCalendarData.data
      ? taskForCalendarData.data.filter(
          (task) => task.startDate <= dateString && task.endDate >= dateString
        )
      : null;
    // const tasksForDate = taskForCalendarData.data
    //   ? taskForCalendarData.data.filter((task) => {
    //       const startDateMinusOneDay = dayjs(task.startDate)
    //         .subtract(1, "day")
    //         .format("YYYY-MM-DD");
    //       return (
    //         startDateMinusOneDay <= dateString && task.endDate >= dateString
    //       );
    //     })
    //   : null;
    return tasksForDate
      ? tasksForDate.map((task) => {
          let type = "success";
          if (task.status === "Chuẩn bị") {
            type = "processing";
          } else if (task.status === "Đang thực hiện") {
            type = "success";
          }
          const formattedStartDate = dayjs(task.startDate).format(
            "HH:mm DD-MM-YYYY"
          );
          const formattedEndDate = dayjs(task.endDate).format(
            "HH:mm DD-MM-YYYY"
          );
          return {
            type: type,
            content: task.name,
            id: task.id,
            taskType: task.taskTypeName,
            status: task.status,
            priority: task.priority,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            material: task.materialName,
            supervisor: task.supervisorName,
            employee: task.employeeName,
            area: task.areaName,
            zone: task.zoneName,
            field: task.fieldName,
            description: task.description,
            addressDetail: task.addressDetail,
          };
        })
      : null;
  };

  const handleDateClick = (value) => {
    const listData = getListData(value);
    if (listData.length > 0) {
      setSelectedDate(value);
      setSelectedDateData(listData);
      setModalVisible(true);
    }
  };

  const dateRender = (current) => {
    const listData = getListData(current);
    return (
      <div className="ant-picker-cell-inner">
        {listData.length > 0 && <Badge count={listData.length} />}
        {listData.length > 0 && (
          <WalletOutlined style={{ fontSize: "16px", color: "#08c" }} />
        )}{" "}
      </div>
    );
  };

  const isMobile = useMobileMediaQuery();

  useEffect(() => {
    const handleResize = () => {
      if (isMobile) {
        document
          .querySelector(".ant-picker-calendar")
          .classList.add("small-calendar");
      } else {
        document
          .querySelector(".ant-picker-calendar")
          .classList.remove("small-calendar");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    const tasksForDate = taskForCalendarData.data
      ? taskForCalendarData.data.filter(
          (task) => task.date === value.format("YYYY-MM-DD")
        )
      : null;

    return (
      <ul className="events">
        {listData
          ? listData.map((item) => (
              <li key={item.id}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))
          : null}
        {tasksForDate
          ? tasksForDate.map((task) => <li key={task.id}>{task.name}</li>)
          : null}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <div className={`content ${loading ? "loading" : ""}`}>
      {loading === true ? (
        <>
          <div className="clock-loading">
            <ClockLoader color="#02c39a" size={150} />
          </div>
          <div style={{ opacity: "0.3" }}>
            <h3>Lịch trình</h3>
            {isMobile ? (
              <Calendar cellRender={dateRender} onSelect={handleDateClick} />
            ) : (
              <Calendar cellRender={cellRender} onSelect={handleDateClick} />
            )}

            <Modal
              title="Chi tiết công việc trong ngày"
              visible={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
              width={800}
            >
              {selectedDateData && (
                <div className="events">
                  {selectedDateData.map((item) => (
                    <div key={item.id}>
                      <Badge status={item.type} text={item.content} />
                    </div>
                  ))}
                </div>
              )}
            </Modal>
          </div>
        </>
      ) : (
        <>
          <h3>Lịch trình</h3>
          <div>
            <span>
              <Badge status="processing" text="Chuẩn bị" />
            </span>
            {/* <span style={{ marginLeft: "10px" }}>
              {" "}
              <Badge status="success" text="Đang thực hiện" />
            </span> */}
          </div>
          {isMobile ? (
            <Calendar cellRender={dateRender} onSelect={handleDateClick} />
          ) : (
            <Calendar cellRender={cellRender} onSelect={handleDateClick} />
          )}

          <Modal
            title={`Các công việc trong ngày ${
              selectedDate ? dayjs(selectedDate).format("DD") : ""
            }`}
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
          >
            {selectedDateData && (
              <Collapse accordion>
                {selectedDateData.map((item) => (
                  <Panel header={item.content} key={item.id}>
                    <Descriptions bordered column={1}>
                      <Descriptions.Item label="Loại công việc" key={item.id}>
                        {item.taskType}
                      </Descriptions.Item>
                      <Descriptions.Item label="Trạng thái" key={item.id}>
                        {item.status}
                      </Descriptions.Item>
                      <Descriptions.Item label="Độ ưu tiên" key={item.id}>
                        {item.priority}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ngày bắt đầu" key={item.id}>
                        {item.startDate}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ngày kết thúc" key={item.id}>
                        {item.endDate}
                      </Descriptions.Item>
                      <Descriptions.Item label="Người giám sát" key={item.id}>
                        {item.supervisor}
                      </Descriptions.Item>
                      {item.material ? (
                        <Descriptions.Item label="Dụng cụ" key={item.id}>
                          {item.material}
                        </Descriptions.Item>
                      ) : (
                        <Descriptions.Item label="Dụng cụ" key={item.id}>
                          <p>Chưa có dụng cụ</p>
                        </Descriptions.Item>
                      )}
                      {item.areaName && item.zoneName ? (
                        <>
                          <Descriptions.Item label="Khu vực" key={item.id}>
                            {item.area}
                          </Descriptions.Item>
                          <Descriptions.Item label="Vùng" key={item.id}>
                            {item.zone}
                          </Descriptions.Item>
                          <Descriptions.Item label="Vị trí" key={item.id}>
                            {item.field}
                          </Descriptions.Item>
                        </>
                      ) : (
                        <Descriptions.Item
                          label="Địa điểm cụ thể"
                          key={item.id}
                        >
                          {item.addressDetail}
                        </Descriptions.Item>
                      )}

                      {item.description ? (
                        <Descriptions.Item label="Mô tả" key={item.id}>
                          {item.description}
                        </Descriptions.Item>
                      ) : (
                        <Descriptions.Item label="Mô tả" key={item.id}>
                          <p>Chưa có mô tả</p>
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Panel>
                ))}
              </Collapse>
            )}
          </Modal>
        </>
      )}
    </div>
  );
}

export default Schedule;
