import React from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";

const ChangeStatusToCancel = ({
  currentTaskId,
  taskToCancelModalVisible,
  closeChangeStatusToCancelModal,
  handleChangeStatusToCancelTask,
  description,
  handleDescription,
  fileList,
  onFileChange,
  isSubmit,
}) => {
  return (
    <>
      {taskToCancelModalVisible && (
        <Modal
          title="Hủy bỏ"
          open={taskToCancelModalVisible}
          onCancel={closeChangeStatusToCancelModal}
          footer={[
            <Button
              form="doingToCancel"
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
            onFinish={() => handleChangeStatusToCancelTask(currentTaskId)}
            id="doingToCancel"
          >
            <Form.Item
              label="Lý do hủy bỏ"
              name="description"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lý do hủy bỏ",
                },
              ]}
            >
              <TextArea
                placeholder="Nhập lý do hủy bỏ"
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

export default ChangeStatusToCancel;
