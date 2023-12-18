import React from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";

const ChangeDoingToPending = ({
  currentTaskId,
  taskDoingToPendingModalVisible,
  closeChangeDoingToPendingModal,
  handleChangeDoingToPendingTask,
  description,
  handleDescription,
  fileList,
  onFileChange,
  isSubmit,
}) => {
  return (
    <>
      {taskDoingToPendingModalVisible && (
        <Modal
          title="Tạm hoãn"
          open={taskDoingToPendingModalVisible}
          onCancel={closeChangeDoingToPendingModal}
          footer={[
            <Button
              form="doingToPending"
              type="primary"
              htmlType="submit"
              disabled={isSubmit}
            >
              Đồng ý
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={() => handleChangeDoingToPendingTask(currentTaskId)}
            id="doingToPending"
          >
            <Form.Item
              label="Lý do tạm hoãn"
              name="description"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lý do hoãn",
                },
              ]}
            >
              <TextArea
                placeholder="Nhập lý do hoãn"
                value={description}
                onChange={handleDescription}
              />
            </Form.Item>
            <Form.Item label="Hình ảnh" name="imageFile">
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={onFileChange}
                >
                  <UploadOutlined />
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ChangeDoingToPending;
