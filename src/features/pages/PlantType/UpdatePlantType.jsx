import { Button, Form, Input, Modal } from 'antd'
import { useEffect } from 'react'
const { TextArea } = Input

const UpdatePlantType = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdatePlantType,
}) => {
  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      name: values.name,
      status: 0,
      origin: values.origin,
      environment: values.environment,
      description: values.description,
    }
    onFinishUpdatePlantType(finalValues)
    closeModal()
  }
  return (
    <>
      <Modal
        title="Cập nhật loại vật nuôi"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updatePlantType"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updatePlantType" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-plant"
          id="updatePlantType"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* Name Animal */}
            <Form.Item
              label="Tên loại cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên loại cây trồng',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên loại cây trồng" />
            </Form.Item>

            <Form.Item
              label="Nguồn gốc"
              name="origin"
              initialValue={selectedData ? selectedData.origin : ''}
            >
              <Input placeholder="Nhập nguồn gốc cây trồng" />
            </Form.Item>

            <Form.Item
              label="Môi trường sống"
              name="environment"
              initialValue={selectedData ? selectedData.environment : ''}
            >
              <Input placeholder="Nhập môi trường sống của cây trồng" />
            </Form.Item>
          </div>

          <div className="form-right">
            <Form.Item
              label="Mô tả"
              name="description"
              initialValue={selectedData ? selectedData.description : ''}
            >
              <TextArea placeholder="Nhập mô tả" showCount maxLength={120} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UpdatePlantType
