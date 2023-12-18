import { Button, Form, Image, Input, Modal, Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
const FormAddMaterial = ({
  isModalOpen,
  closeModal,
  onFinishCreate,
  farmId,
}) => {
  const [fileList, setFileList] = useState([])
  const [uploadError, setUploadError] = useState(false)
  const [form] = Form.useForm()

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleFormReset = () => {
    form.resetFields()
    setFileList([])
    setUploadError(false)
  }

  const onFinish = (values) => {
    if (fileList.length === 0) {
      setUploadError(true)
      return
    }
    setUploadError(false)
    const formData = {
      ...values,
      imageFile: fileList[0].originFileObj,
      farmId: farmId,
    }
    onFinishCreate(formData)
    closeModal()
    handleFormReset()
  }

  return (
    <>
      <Modal
        title="Tạo mới công cụ"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createMaterial" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createMaterial"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createMaterial" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-area"
          id="createMaterial"
          onFinish={onFinish}
          form={form}
        >
          {/* Name */}
          <Form.Item
            label="Tên công cụ"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên công cụ',
              },
            ]}
            name="name"
          >
            <Input placeholder="Nhập tên công cụ" />
          </Form.Item>

          <Form.Item label="Hình ảnh công cụ" required>
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={fileList}
                onChange={onFileChange}
                beforeUpload={() => false}
              >
                <UploadOutlined />
              </Upload>
            </ImgCrop>
            {uploadError && (
              <div style={{ color: 'red' }}>
                Vui lòng tải lên hình ảnh công cụ
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddMaterial
