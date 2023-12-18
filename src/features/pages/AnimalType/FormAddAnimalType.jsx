import { Button, Form, Input, Modal } from 'antd'
const { TextArea } = Input

const FormAddAnimalType = ({
  farmId,
  isModalOpenType,
  closeModalType,
  onFinishCreateAnimalType,
}) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    const finalValues = {
      ...values,
      farmId: farmId,
      status: 1,
    }
    onFinishCreateAnimalType(finalValues)
    closeModalType()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Thêm mới loại vật nuôi"
        open={isModalOpenType}
        onCancel={closeModalType}
        footer={[
          <Button form="createAnimalType" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createAnimalType"
            type="primary"
            danger
            onClick={closeModalType}
          >
            Huỷ
          </Button>,
          <Button form="createAnimalType" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          id="createAnimalType"
          onFinish={onFinish}
          form={form}
          className="first-step-animal-type"
        >
          <div className="form-left">
            {/* Plant Type Name */}
            <Form.Item
              label="Tên loại vật nuôi"
              name="name"
              rules={[
                { required: true, message: 'Vui lòng nhập tên loại vật nuôi' },
              ]}
            >
              <Input placeholder="Nhập tên loại vật nuôi" />
            </Form.Item>

            <Form.Item label="Nguồn gốc" name="origin">
              <Input placeholder="Nhập nguồn gốc vật nuôi" />
            </Form.Item>

            <Form.Item label="Môi trường sống" name="environment">
              <Input placeholder="Nhập môi trường sống của vật nuôi" />
            </Form.Item>
          </div>

          <div className="form-right">
            <Form.Item label="Mô tả" name="description">
              <TextArea placeholder="Nhập mô tả" showCount maxLength={120} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddAnimalType
