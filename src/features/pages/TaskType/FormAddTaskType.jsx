import { Button, Form, Input, Modal, Radio, Space } from 'antd'
const { TextArea } = Input

const FormAddTaskType = ({
  isModalOpenType,
  closeModalType,
  onFinishCreateTaskType,
}) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    onFinishCreateTaskType(values)
    closeModalType()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Thêm mới loại công việc"
        open={isModalOpenType}
        onCancel={closeModalType}
        footer={[
          <Button form="createTaskType" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createTaskType"
            type="primary"
            danger
            onClick={closeModalType}
          >
            Huỷ
          </Button>,
          <Button form="createTaskType" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          id="createTaskType"
          className="first-step-plant"
          onFinish={onFinish}
          form={form}
        >
          {/* Plant Type Name */}

          <div className="form-left">
            <Form.Item
              label="Tên loại công việc"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên loại công việc',
                },
              ]}
            >
              <Input placeholder="Nhập tên loại công việc" />
            </Form.Item>

            <Form.Item
              label="Công việc"
              name="status"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại công việc',
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={0}>Trồng trọt</Radio>
                  <Radio value={1}>Chăn nuôi</Radio>
                  <Radio value={2}>Khác</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="form-right">
            <Form.Item label="Mô tả" name="description">
              <TextArea placeholder="Nhập mô tả" showCount maxLength={200} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddTaskType
