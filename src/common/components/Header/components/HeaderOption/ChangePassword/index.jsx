import { Button, Form, Input, Modal, Space } from "antd";
import React from "react";

const ChangePassword = ({
  changePasswordModalVisible,
  changePasswordCancel,
  isSubmitting,
  handleSubmitChangePassword,
  form,
  oldPasswordValue,
  handleChangePassword,
  oldPasswordVisible,
  setOldPasswordVisible,
  newPasswordValue,
  handleChangeNewPassword,
  newPasswordVisible,
  setNewPasswordVisible,
  confirmPasswordValue,
  handleConfirmPassword,
  confirmPasswordVisible,
  setConfirmPasswordVisible,
}) => {
  return (
    <>
      {changePasswordModalVisible && (
        <Modal
          title="Đổi mật khẩu"
          open={changePasswordModalVisible}
          onCancel={changePasswordCancel}
          width={400}
          footer={[
            <Button onClick={changePasswordCancel}>Hủy</Button>,
            <Button
              form="changePassword"
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
            >
              Thay đổi mật khẩu
            </Button>,
          ]}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form
              layout="vertical"
              onFinish={handleSubmitChangePassword}
              id="changePassword"
              form={form}
            >
              <Form.Item
                label="Mật khẩu hiện tại"
                name="oldPassword"
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu hiện tại",
                  },
                ]}
              >
                <Space direction="horizontal">
                  <Input.Password
                    placeholder="Nhập mật khẩu hiện tại"
                    value={oldPasswordValue}
                    onChange={handleChangePassword}
                    visibilityToggle={{
                      visible: oldPasswordVisible,
                      onVisibleChange: setOldPasswordVisible,
                    }}
                  />
                  <Button
                    style={{
                      width: 80,
                    }}
                    onClick={() =>
                      setOldPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {oldPasswordVisible ? "Ẩn" : "Hiện"}
                  </Button>
                </Space>
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="password"
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới",
                  },
                ]}
              >
                <Space direction="horizontal">
                  <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    value={newPasswordValue}
                    onChange={handleChangeNewPassword}
                    visibilityToggle={{
                      visible: newPasswordVisible,
                      onVisibleChange: setNewPasswordVisible,
                    }}
                  />
                  <Button
                    style={{
                      width: 80,
                    }}
                    onClick={() =>
                      setNewPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {newPasswordVisible ? "Ẩn" : "Hiện"}
                  </Button>
                </Space>
              </Form.Item>
              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="confirmPassword"
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu",
                  },
                ]}
              >
                <Space direction="horizontal">
                  <Input.Password
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmPasswordValue}
                    onChange={handleConfirmPassword}
                    visibilityToggle={{
                      visible: confirmPasswordVisible,
                      onVisibleChange: setConfirmPasswordVisible,
                    }}
                  />
                  <Button
                    style={{
                      width: 80,
                    }}
                    onClick={() =>
                      setConfirmPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {confirmPasswordVisible ? "Ẩn" : "Hiện"}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ChangePassword;
