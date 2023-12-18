import React from "react";
import { Avatar, Badge, Dropdown, Popover, Space } from "antd";
import Notification from "features/pages/Notification";
import {
  UserOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";


const HeaderOption = ({
  loading,
  isNotificationVisible,
  setIsNotificationVisible,
  countNew,
  items,
  member,
  isModalVisible,
  handleCancel,
  handleOpenEditProfile,
  formattedBirthDay,
  isModalEditVisible,
  closeEditProfile,
  handleEditProfile,
  fileList,
  onFileChange
}) => {
  return (
    <div className="nav-item">
      <div className="header-notification">
        {!loading ? (
          <Popover
            placement="bottomRight"
            title={<h3>Thông báo</h3>}
            content={
              <div
                style={{
                  height: "500px",
                  overflowY: "auto",
                  padding: "10px",
                }}
              >
                <Notification />
              </div>
            } // Thay thế bằng nội dung của thông báo
            trigger="hover"
            open={isNotificationVisible}
            onVisibleChange={(visible) => setIsNotificationVisible(visible)}
          >
            <Badge count={countNew?.data !== 0 ? countNew.data : 0}>
              <BellOutlined className="notification-icon" />
            </Badge>
          </Popover>
        ) : null}
      </div>
      <div className="header-profile">
        <Dropdown
          menu={{
            items,
          }}
          trigger={["hover"]}
          placement="bottom"
          arrow
        >
          <a onClick={(e) => e.preventDefault()}>
            {!loading ? (
              <Space>
                <Avatar
                  src={member.avatar}
                  size="large"
                  icon={<UserOutlined />}
                />
                {member.name}
                <DownOutlined />
              </Space>
            ) : null}
          </a>
        </Dropdown>
      </div>
      <UserProfile
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        member={member}
        handleOpenEditProfile={handleOpenEditProfile}
        formattedBirthDay={formattedBirthDay}
      />
      <EditProfile
        isModalEditVisible={isModalEditVisible}
        closeEditProfile={closeEditProfile}
        handleEditProfile={handleEditProfile}
        fileList={fileList}
        onFileChange={onFileChange}
        member={member}
      />
    </div>
  );
};

export default HeaderOption;
