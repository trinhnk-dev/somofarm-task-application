import { Avatar, Badge, Tooltip } from "antd";
import dayjs from "dayjs";
import { FileTextOutlined } from "@ant-design/icons";

export const taskTitle = [
  {
    title: <p>Mã</p>,
    dataIndex: "code",
    key: "code",
    render: (code, record) => (
      <p data-name-clicked="true">
        {record && record.isHaveEvidence ? (
          <Badge.Ribbon
            className="ribbon-evidence"
            color="#8EAD48"
            style={{ top: 0, insetInlineEnd: "-8px" }}
            text={<FileTextOutlined />}
          >
            <Tooltip placement="bottomLeft" title={code}>
              <>
                {code ? (
                  <p
                    style={{
                      border: "1px solid #f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      padding: "5px 0px",
                      borderRadius: "8px",
                      boxShadow: "1px 1px #f5f5f5",
                    }}
                  >
                    <span style={{ marginLeft: "5px" }}>
                      #{code.slice(0, 5) + (code.length > 5 ? "..." : "")}
                    </span>
                  </p>
                ) : null}
              </>
            </Tooltip>
          </Badge.Ribbon>
        ) : (
          <Tooltip placement="bottomLeft" title={code}>
            <>
              {code ? (
                <p>#{code.slice(0, 5) + (code.length > 5 ? "..." : "")}</p>
              ) : null}
            </>
          </Tooltip>
        )}
      </p>
    ),
  },
  {
    title: <p>Tên công việc</p>,
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <Tooltip placement="bottomLeft" title="Xem chi tiết">
        <h4 className="task-name" data-name-clicked="true">
          {text ? (
            <>{text}</>
          ) : null}
        </h4>
      </Tooltip>
    ),
  },
  {
    title: <p>Ngày bắt đầu</p>,
    dataIndex: "startDate",
    key: "startDate",
    render: (date, record) => {
      return date ? (
        record && record.isStartLate ? (
          <Badge.Ribbon
            className="ribbon-expired"
            style={{ top: 0, insetInlineEnd: "-8px" }}
            text="Trễ"
            color="#ff7b00"
          >
            <p
              style={{
                border: "1px solid #f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "5px 0px",
                borderRadius: "8px",
                boxShadow: "1px 1px #f5f5f5",
              }}
            >
              <span style={{ marginLeft: "5px" }}>
                {" "}
                {dayjs(date).format("DD/MM/YYYY HH:mm")}
              </span>
            </p>
          </Badge.Ribbon>
        ) : (
          <span style={{ marginLeft: "5px" }}>
            {" "}
            {dayjs(date).format("DD/MM/YYYY HH:mm")}
          </span>
        )
      ) : (
        "Chưa có"
      );
    },
  },
  {
    title: <p>Ngày kết thúc</p>,
    dataIndex: "endDate",
    key: "endDate",
    render: (date, record) => {
      return date ? (
        record && record.isExpired ? (
          <Badge.Ribbon
            className="ribbon-expired"
            style={{ top: 0, insetInlineEnd: "-8px" }}
            text="Trễ"
            color="#ff7b00"
          >
            <p
              style={{
                border: "1px solid #f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "5px 0px",
                borderRadius: "8px",
                boxShadow: "1px 1px #f5f5f5",
              }}
            >
              <span style={{ marginLeft: "5px" }}>
                {" "}
                {dayjs(date).format("DD/MM/YYYY HH:mm")}
              </span>
            </p>
          </Badge.Ribbon>
        ) : (
          <span style={{ marginLeft: "5px" }}>
            {" "}
            {dayjs(date).format("DD/MM/YYYY HH:mm")}
          </span>
        )
      ) : (
        "Chưa có"
      );
    },
  },
  {
    title: <p>Ưu tiên</p>,
    dataIndex: "priority",
    key: "priority",
    render: (text) => {
      let colorCircle = "";
      switch (text) {
        case "Cao":
          colorCircle = "#f94144";
          break;
        case "Trung bình":
          colorCircle = "#e09f3e";
          break;
        case "Thấp":
          colorCircle = "#90be6d";
          break;
        default:
          colorCircle = "";
      }
      return (
        <span
          style={{
            color: "black",
            border: "1px solid #f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "5px 0px",
            borderRadius: "8px",
            boxShadow: "1px 1px #f5f5f5",
          }}
        >
          <div
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: colorCircle,
              marginLeft: "5px",
              marginRight: "10px",
            }}
          ></div>
          {text}
        </span>
      );
    },
  },
  {
    title: <p>Người giám sát</p>,
    dataIndex: "supervisorName",
    key: "supervisorName",
    render: (data, record) => {
      return data && record ? (
        <Tooltip placement="bottom" title={data}>
          <span
            style={{
              border: "1px solid #f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "5px 0px",
              borderRadius: "8px",
              boxShadow: "1px 1px #f5f5f5",
            }}
          >
            <Avatar
              src={
                record && record.avatarSupervisor
                  ? record.avatarSupervisor
                  : null
              }
              style={{
                width: "16px",
                height: "16px",
                marginLeft: "5px",
                marginRight: "10px",
              }}
            />
            {data.slice(0, 5) + (data.length > 5 ? "..." : "")}
          </span>
        </Tooltip>
      ) : (
        "Chưa có"
      );
    },
  },
  {
    title: <p>Được tạo bởi</p>,
    dataIndex: "managerName",
    key: "managerName",
    render: (text, record) => (
      <span>
        {text && record ? (
          <Tooltip placement="bottom" title={text ? text : null}>
            <span
              style={{
                border: "1px solid #f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "5px 0px",
                borderRadius: "8px",
                boxShadow: "1px 1px #f5f5f5",
              }}
            >
              <Avatar
                src={
                  record && record.avatarManager ? record.avatarManager : null
                }
                style={{
                  width: "16px",
                  height: "16px",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              />
              {text && text.slice(0, 5) + (text.length > 5 ? "..." : "")}
            </span>
          </Tooltip>
        ) : (
          <Tooltip
            placement="bottom"
            title={
              record && record.supervisorName ? record.supervisorName : null
            }
          >
            <span
              style={{
                border: "1px solid #f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "5px 0px",
                borderRadius: "8px",
                boxShadow: "1px 1px #f5f5f5",
              }}
            >
              <Avatar
                src={
                  record && record.avatarSupervisor
                    ? record.avatarSupervisor
                    : null
                }
                style={{
                  width: "16px",
                  height: "16px",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              />
              {record &&
                record.supervisorName &&
                record.supervisorName.slice(0, 6) +
                  (record.supervisorName.length > 6 ? "..." : "")}
            </span>
          </Tooltip>
        )}
      </span>
    ),
  },
];

export const onChange = (sorter) => {
};
