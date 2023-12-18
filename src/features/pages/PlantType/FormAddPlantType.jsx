import { Button, Form, Input, Modal } from 'antd'
const { TextArea } = Input

const FormAddPlantType = ({
  farmId,
  isModalOpenType,
  closeModalType,
  onFinishCreatePlantType,
}) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    const finalValues = {
      ...values,
      farmId: farmId,
      status: 0,
    }
    onFinishCreatePlantType(finalValues)
    closeModalType()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Thêm mới loại cây trồng"
        open={isModalOpenType}
        onCancel={closeModalType}
        footer={[
          <Button form="createPlantType" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createPlantType"
            type="primary"
            danger
            onClick={closeModalType}
          >
            Huỷ
          </Button>,
          <Button form="createPlantType" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          id="createPlantType"
          className="first-step-plan-type"
          onFinish={onFinish}
          form={form}
        >
          {/* Plant Type Name */}

          <div className="form-left">
            <Form.Item
              label="Tên loại cây trồng"
              name="name"
              rules={[
                { required: true, message: 'Vui lòng nhập tên loại cây trồng' },
              ]}
            >
              <Input placeholder="Nhập tên loại cây trồng" />
            </Form.Item>

            <Form.Item label="Nguồn gốc" name="origin">
              <Input placeholder="Nhập nguồn gốc cây trồng" />
            </Form.Item>

            <Form.Item label="Môi trường sống" name="environment">
              <Input placeholder="Nhập môi trường sống của cây trồng" />
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
export default FormAddPlantType
