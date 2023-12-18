import React from "react";
import { Button, Modal, Descriptions, Avatar, Image } from "antd";
import dayjs from "dayjs";

const DetailMember = ({
  isModalOpenDetail,
  closeModalDetail,
  selectedMember,
}) => {
  const formattedBirthDay = selectedMember
    ? dayjs(selectedMember.birthday).format("DD-MM-YYYY")
    : null;
  return (
    <Modal
      title="Thông tin nhân viên"
      open={isModalOpenDetail}
      closeIcon
      onCancel={closeModalDetail}
      footer={[<Button onClick={closeModalDetail}>Đóng</Button>]}
    >
      {selectedMember && (
        <Descriptions bordered column={1}>
          <Descriptions.Item>
            <Avatar src={selectedMember.avatar} size="large" />
          </Descriptions.Item>
          <Descriptions.Item label="Họ và tên">
            {selectedMember.name}
          </Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập">
            {selectedMember.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {formattedBirthDay}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {selectedMember.address}
          </Descriptions.Item>
          <Descriptions.Item label="Chức vụ">
            {selectedMember.roleName}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {selectedMember.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {selectedMember.email}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default DetailMember;
