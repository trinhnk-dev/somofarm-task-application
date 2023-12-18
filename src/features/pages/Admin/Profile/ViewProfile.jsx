import { Avatar, Modal } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";

const ViewProfile = ({ admin, handleOpenEditProfile, formattedBirthDay }) => {
  return (
    <div className="user-profile-admin">
      <div className="user-profile-content">
        <div className="user-profile-left">
          <Avatar src={admin ? admin.avatar : null} size={150} />
          <h4>{admin ? admin.name : null}</h4>
          {admin ? (
            admin.roleName === "Manager" ? (
              <p>Chức vụ: Quản lý</p>
            ) : (
              <p>Chức vụ: Admin</p>
            )
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
              <p>{admin ? admin.email : "Chưa có"}</p>
            </div>
            <div className="user-information-text">
              <h6>Số điện thoại</h6>
              <p>{admin ? admin.phoneNumber : "Chưa có"}</p>
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
              <p>{admin ? admin.address : "Chưa có"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
