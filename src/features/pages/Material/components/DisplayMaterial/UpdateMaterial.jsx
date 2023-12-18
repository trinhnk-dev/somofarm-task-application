import { Button, Form, Image, Input, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'

const UpdateMaterial = ({
  isModalOpen,
  closeModal,
  onFinishUpdate,
  materialById,
  farmId,
}) => {
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (materialById?.data?.urlImage) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: materialById.data.urlImage,
        },
      ])
    }
  }, [materialById])

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onFinish = (values) => {
    const formData = {
      ...values,
      id: materialById ? materialById?.data?.id : null,
      imageFile: fileList[0].originFileObj,
      farmId: farmId,
    }
    onFinishUpdate(formData)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Cập nhật công cụ"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateMaterial"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateMaterial" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-area"
          id="updateMaterial"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên công cụ"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên công cụ',
              },
            ]}
            name="name"
            initialValue={materialById ? materialById?.data?.name : null}
          >
            <Input placeholder="Nhập tên công cụ" />
          </Form.Item>

          <Form.Item label="Hình ảnh công cụ" name="imageFile">
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
    </>
  )
}
export default UpdateMaterial
