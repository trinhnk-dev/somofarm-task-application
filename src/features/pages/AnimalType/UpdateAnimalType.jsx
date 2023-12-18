import { Button, Form, Input, Modal } from 'antd'
import { getAnimalTypeActive } from 'features/slice/animal/animalTypeActiveSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
const { TextArea } = Input

const UpdateAnimalType = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdateAnimalType,
}) => {
  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      name: values.name,
      status: 1,
      origin: values.origin,
      environment: values.environment,
      description: values.description,
    }

    onFinishUpdateAnimalType(finalValues)
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
            form="updateAnimalType"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateAnimalType" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateAnimalType"
          onFinish={onFinish}
        >
          <div className="form-left">
            {/* Name Animal */}
            <Form.Item
              label="Tên loại vật nuôi"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên loại vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên loại vật nuôi" />
            </Form.Item>

            <Form.Item
              label="Nguồn gốc"
              name="origin"
              initialValue={selectedData ? selectedData.origin : ''}
            >
              <Input placeholder="Nhập nguồn gốc vật nuôi" />
            </Form.Item>

            <Form.Item
              label="Môi trường sống"
              name="environment"
              initialValue={selectedData ? selectedData.environment : ''}
            >
              <Input placeholder="Nhập môi trường sống của vật nuôi" />
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
export default UpdateAnimalType
