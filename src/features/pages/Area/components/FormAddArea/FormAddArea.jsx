import { Button, Form, Input, InputNumber, Modal } from 'antd'

const FormAddArea = ({ isModalOpen, closeModal, onFinishCreate }) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    onFinishCreate(values)
    closeModal()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Tạo mới khu vực"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createArea" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button form="createArea" type="primary" danger onClick={closeModal}>
            Huỷ
          </Button>,
          <Button form="createArea" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-area"
          id="createArea"
          onFinish={onFinish}
          form={form}
        >
          {/* Area Name */}
          <Form.Item
            label="Tên khu vực"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên khu vực',
              },
            ]}
            name="name"
          >
            <Input placeholder="Nhập tên khu vực" />
          </Form.Item>

          {/* Area Code */}
          <Form.Item
            label="Mã khu vực"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã khu vực',
              },
            ]}
            name="code"
          >
            <Input placeholder="Nhập mã cây trồng" />
          </Form.Item>

          <Form.Item
            label="Diện tích (m2)"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập diện tích khu vực',
              },
            ]}
            name="fArea"
          >
            <InputNumber min={0} addonAfter="m2" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddArea
