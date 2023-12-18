import React from "react";
import { Avatar, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useMobileMediaQuery } from "common/hooks/responsive";

const UserProfile = ({
  isModalVisible,
  handleCancel,
  member,
  handleOpenEditProfile,
  formattedBirthDay,
}) => {
  const isMobile = useMobileMediaQuery()
  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      width={isMobile ? "500px" : "800px"}
      footer={null}
      className="user-profile"
    >
      <div className="user-profile-content">
        <div className="user-profile-left">
          <Avatar src={member ? member.avatar : null} size={150} />
          <h4>{member ? member.name : null}</h4>
          {member ? (
            member.roleName === "Manager" ? (
              <p>Chức vụ: Quản lý</p>
            ) : null
          ) : null}
        </div>
        <div className="user-profile-right">
          <h5>
            Thông tin cá nhân
            <span onClick={handleOpenEditProfile}>
              <EditOutlined />
            </span>
          </h5>

          <div className="user-information">
            <div className="user-information-text" style={{ width: "100%" }}>
              <h6>Email</h6>
              <p>{member ? member.email : "Chưa có"}</p>
            </div>
            <div className="user-information-text">
              <h6>Số điện thoại</h6>
              <p>{member ? member.phoneNumber : "Chưa có"}</p>
            </div>
            <div className="user-information-text">
              <h6>Ngày sinh</h6>
              <p>{formattedBirthDay}</p>
            </div>
          </div>
          <h5>Địa chỉ</h5>
          <div className="user-address">
            <div className="user-information-text">
              <h6>Địa chỉ thường trú</h6>
              <p>{member ? member.address : "Chưa có"}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfile;
