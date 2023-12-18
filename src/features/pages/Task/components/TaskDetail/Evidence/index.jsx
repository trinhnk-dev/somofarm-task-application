import React, { useState } from "react";
import { useSelector } from "react-redux";
import NoImage from "../../../../../../assets/no-image.png";
import { Avatar, Button, Collapse, Empty, Image, Space, Timeline } from "antd";
import { GrDocumentImage } from "react-icons/gr";
import dayjs from "dayjs";
import {
  useMobileMediaQuery,
  useMobileSMMediaQuery,
  useTabletMediaQuery,
} from "common/hooks/responsive";

const { Panel } = Collapse;

function Evidence({ taskData }) {
  const evidenceData = useSelector((state) => state.evidence.data);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);

  const handleToggleDescription = (evidenceId) => {
    setExpandedDescriptions((prevExpanded) => {
      if (prevExpanded.includes(evidenceId)) {
        return prevExpanded.filter((id) => id !== evidenceId);
      } else {
        return [...prevExpanded, evidenceId];
      }
    });
  };

  const isMobile = useMobileMediaQuery()

  const renderImages = () => {
    if (evidenceData && evidenceData.data && evidenceData.data.length > 0) {
      const timelineItems = evidenceData.data.map((evidence) => {
        const formattedUpdateDate = dayjs(evidence.submitDate).format(
          "Ngày DD-MM-YYYY HH:mm"
        );
        return {
          status:
            evidence.evidenceType === 0 ? (
              <p className="evidence-status" style={{ color: "#38b000" }}>
                Bình thường
              </p>
            ) : evidence.evidenceType === 1 ? (
              <p className="evidence-status" style={{ color: "#f77f00" }}>
                Từ chối
              </p>
            ) : evidence.evidenceType === 2 ? (
              <p className="evidence-status" style={{ color: "red" }}>
                Hủy bỏ
              </p>
            ) : evidence.evidenceType === 3 ? (
              <p className="evidence-status" style={{ color: "#fca311" }}>
                Tạm hoãn
              </p>
            ) : evidence.evidenceType === 4 ? (
              <p className="evidence-status" style={{ color: "#124e78" }}>
                Làm lại
              </p>
            ) : evidence.evidenceType === 5 ? (
              <p className="evidence-status" style={{ color: "red" }}>
                Từ chối người giám sát
              </p>
            ) : null,
          date: formattedUpdateDate,
          content: (
            <div key={evidence.id} className="evidence-content">
              {evidence.managerName ? (
                <div className="evidence-item-header">
                  <div className="evidence-name">
                    <Avatar src={evidence.avatarManager} size="large" />
                    <h3>{evidence.managerName}</h3>
                  </div>
                  {!isMobile ? (
                    <p className="evidence-time">{evidence.time}</p>
                  ) : null}
                </div>
              ) : (
                <div className="evidence-item-header">
                  <div className="evidence-name">
                    <Avatar
                      src={taskData ? taskData.avatarSupervisor : null}
                      size="large"
                    />
                    <h3>{taskData ? taskData.supervisorName : null}</h3>
                  </div>

                  {!isMobile ? (
                    <p className="evidence-time">{evidence.time}</p>
                  ) : null}
                </div>
              )}

              <div className="evidence-item">
                {evidence.evidenceType === 1 ? (
                  <div className="evidence-desc">
                    <h6 style={{ color: "#000" }}>Lý do từ chối:</h6>{" "}
                    {evidence.description.length > 200 ? (
                      <>
                        {expandedDescriptions.includes(evidence.id) ? (
                          <>
                            {evidence.description}.
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              thu gọn
                            </span>
                          </>
                        ) : (
                          <>
                            {evidence.description.substring(0, 200)}...
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              xem thêm
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      evidence.description
                    )}
                  </div>
                ) : evidence.evidenceType === 2 ? (
                  <div className="evidence-desc">
                    <h6 style={{ color: "#000" }}>Lý do hủy bỏ:</h6>{" "}
                    {evidence.description.length > 200 ? (
                      <>
                        {expandedDescriptions.includes(evidence.id) ? (
                          <>
                            {evidence.description}.
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              thu gọn
                            </span>
                          </>
                        ) : (
                          <>
                            {evidence.description.substring(0, 200)}...
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              xem thêm
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      evidence.description
                    )}
                  </div>
                ) : evidence.evidenceType === 3 ? (
                  <div className="evidence-desc">
                    <h6 style={{ color: "#000" }}>Lý do tạm hoãn:</h6>{" "}
                    {evidence.description.length > 200 ? (
                      <>
                        {expandedDescriptions.includes(evidence.id) ? (
                          <>
                            {evidence.description}.
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              thu gọn
                            </span>
                          </>
                        ) : (
                          <>
                            {evidence.description.substring(0, 200)}...
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              xem thêm
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      evidence.description
                    )}
                  </div>
                ) : evidence.evidenceType === 4 ? (
                  <div className="evidence-desc">
                    {evidence.description.length > 200 ? (
                      <>
                        {expandedDescriptions.includes(evidence.id) ? (
                          <>
                            {evidence.description}.
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              thu gọn
                            </span>
                          </>
                        ) : (
                          <>
                            {evidence.description.substring(0, 200)}...
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              xem thêm
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      evidence.description
                    )}
                  </div>
                ) : evidence.evidenceType === 5 ? (
                  <div className="evidence-desc">
                    <h6 style={{ color: "#000" }}>Lý do từ chối:</h6>{" "}
                    {evidence.description.length > 200 ? (
                      <>
                        {expandedDescriptions.includes(evidence.id) ? (
                          <>
                            {evidence.description}.
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              thu gọn
                            </span>
                          </>
                        ) : (
                          <>
                            {evidence.description.substring(0, 200)}...
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              xem thêm
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      evidence.description
                    )}
                  </div>
                ) : (
                  <div className="evidence-desc">
                    {evidence.description.length > 200 ? (
                      <>
                        {expandedDescriptions.includes(evidence.id) ? (
                          <>
                            {evidence.description}.
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              thu gọn
                            </span>
                          </>
                        ) : (
                          <>
                            {evidence.description.substring(0, 200)}...
                            <span
                              className="toggle-description"
                              onClick={() =>
                                handleToggleDescription(evidence.id)
                              }
                            >
                              xem thêm
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      evidence.description
                    )}
                  </div>
                )}
              </div>

              {evidence.urlImage && evidence.urlImage.length > 0 ? (
                <div className="evidence-img">
                  <Collapse accordion className="collapse-evidence">
                    <Panel
                      header={
                        <div className="evidence-panel">
                          <div className="evidence-panel-title">
                            <GrDocumentImage
                              style={{
                                marginRight: "8px",
                                transform: "translateY(10%)",
                              }}
                            />
                            Xem {evidence.urlImage.length} hình ảnh báo cáo
                          </div>
                        </div>
                      }
                    >
                      <div className="img-contain">
                        <Image.PreviewGroup>
                          {evidence.urlImage && evidence.urlImage ? (
                            evidence.urlImage.map((url, imageIndex) => (
                              <>
                                {evidence.urlImage.length === 1 ? (
                                  <div
                                    className="img-evidence"
                                    key={imageIndex}
                                  >
                                    <Image
                                      src={url}
                                      alt={`evidence-${imageIndex}`}
                                    />
                                  </div>
                                ) : evidence.urlImage.length === 2 ? (
                                  <div
                                    className="img-evidence-2"
                                    key={imageIndex}
                                  >
                                    <Image
                                      src={url}
                                      alt={`evidence-${imageIndex}`}
                                    />
                                  </div>
                                ) : evidence.urlImage.length === 3 ? (
                                  <div
                                    className="img-evidence-3"
                                    key={imageIndex}
                                  >
                                    <Image
                                      src={url}
                                      alt={`evidence-${imageIndex}`}
                                    />
                                  </div>
                                ) : evidence.urlImage.length === 4 ? (
                                  <div
                                    className="img-evidence-4"
                                    key={imageIndex}
                                  >
                                    <Image
                                      src={url}
                                      alt={`evidence-${imageIndex}`}
                                    />
                                  </div>
                                ) : evidence.urlImage.length > 4 ? (
                                  <div
                                    style={{
                                      display:
                                        imageIndex >= 4 &&
                                        evidence.urlImage.length > 4
                                          ? "none"
                                          : "block",
                                    }}
                                    className={`img-evidence-more-4 ${
                                      imageIndex === 3 &&
                                      evidence.urlImage.length > 4
                                        ? "overlay"
                                        : ""
                                    }`}
                                    key={imageIndex}
                                  >
                                    <Image
                                      src={url}
                                      alt={`evidence-${imageIndex}`}
                                    />
                                    {imageIndex === 3 &&
                                      evidence.urlImage.length > 4 && (
                                        <div className="overlay-background">
                                          <div className="overlay-text">
                                            +{evidence.urlImage.length - 4}
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                ) : null}
                              </>
                            ))
                          ) : (
                            <img src={NoImage} alt="Không có ảnh" />
                          )}
                        </Image.PreviewGroup>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              ) : null}
            </div>
          ),
        };
      });

      return (
        <Space direction="horizontal">
          <Timeline mode="left">
            {timelineItems.map((item, index) => (
              <Timeline.Item
                color={
                  item.status.props.children === "Bình thường"
                    ? "#38b000"
                    : item.status.props.children === "Từ chối"
                    ? "#f77f00"
                    : item.status.props.children === "Hủy bỏ"
                    ? "red"
                    : item.status.props.children === "Tạm hoãn"
                    ? "#fca311"
                    : item.status.props.children === "Làm lại"
                    ? "#124e78"
                    : item.status.props.children === "Từ chối người giám sát"
                    ? "red"
                    : null
                }
                key={index}
                label={
                  <>
                    {item.status.props.children === "Bình thường" ? (
                      <p>{item.date}</p>
                    ) : (
                      <>
                        {" "}
                        <p>{item.status}</p>
                        <p>{item.date}</p>
                      </>
                    )}
                  </>
                }
              >
                {item.content}
              </Timeline.Item>
            ))}
          </Timeline>
        </Space>
      );
    } else {
      return <Empty description="Chưa có báo cáo nào" />;
    }
  };
  return (
    <div className="evidence">
      <h6
        style={{ fontSize: "24px", fontWeight: "2000", paddingBottom: "20px" }}
      >
        Báo cáo công việc
      </h6>
      {renderImages()}
    </div>
  );
}

export default Evidence;
