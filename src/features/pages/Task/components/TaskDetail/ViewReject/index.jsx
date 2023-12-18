import {
  Avatar,
  Button,
  Checkbox,
  Collapse,
  Image,
  Modal,
  Popconfirm,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GrDocumentImage } from "react-icons/gr";
import NoImage from "../../../../../../assets/no-image.png";

const { Panel } = Collapse;

const ViewReject = ({
  viewRejectModalVisible,
  closeViewRejectModal,
  taskData,
  handleRefuseTask,
  openEditTaskModal,
  selectedTask,
  isImportant,
  handleCheckImportant,
}) => {
  const evidence = useSelector((state) => state.evidence.data);
  const evidenceData = evidence?.data;

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

  const confirm = () => {
    handleRefuseTask(taskData.id);
  };

  return (
    <>
      {viewRejectModalVisible && evidenceData ? (
        <Modal
          open={viewRejectModalVisible}
          onCancel={closeViewRejectModal}
          width={600}
          footer={
            <>
              <Popconfirm
                title="Không chấp nhận?"
                description={
                  <div>
                    <p style={{marginBottom: "10px"}}>Bạn chắc chắn sẽ từ bỏ yêu cầu này chứ?</p>
                    <Checkbox
                      onChange={handleCheckImportant}
                      checked={isImportant}
                    >
                      Công việc này không thể từ chối nữa
                    </Checkbox>
                  </div>
                }
                onConfirm={confirm}
                okText="Đồng ý"
                cancelText="Không"
                placement="bottom"
              >
                <Button type="primary" danger>
                  Không chấp nhận
                </Button>
              </Popconfirm>

              <Button onClick={() => openEditTaskModal(selectedTask)}>
                Giao lại
              </Button>
            </>
          }
          title="Lý do từ chối"
        >
          {evidenceData?.map((evidence) => {
            return (
              <div key={evidence.id} className="evidence-content">
                <div className="evidence-item-header">
                  <div className="evidence-name">
                    <Avatar
                      src={taskData ? taskData.avatarSupervisor : null}
                      size="large"
                    />
                    <h3>{taskData ? taskData.supervisorName : null}</h3>
                  </div>
                  <p className="evidence-time">{evidence.time}</p>
                </div>

                <div className="evidence-item">
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
            );
          })}
        </Modal>
      ) : null}
    </>
  );
};

export default ViewReject;
