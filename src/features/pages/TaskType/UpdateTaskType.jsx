import { Button, Form, Input, Modal, Radio, Space } from 'antd'
const { TextArea } = Input

const UpdateTaskType = ({
  taskTypeById,
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdateTaskType,
}) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    const finalValues = {
      ...values,
      id: selectedData.id,
    }
    onFinishUpdateTaskType(finalValues)
    closeModal()
    form.resetFields()
  }
  return (
    <>
      <Modal
        title="Cập nhật loại công việc"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateTaskType"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateTaskType" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-plant"
          id="updateTaskType"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/* Name Animal */}
            <Form.Item
              label="Tên loại công việc"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên loại công việc',
                },
              ]}
              initialValue={taskTypeById ? taskTypeById?.data?.name : ''}
              name="name"
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
              initialValue={taskTypeById ? taskTypeById?.data?.status : null}
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
            <Form.Item
              label="Mô tả"
              name="description"
              initialValue={taskTypeById ? taskTypeById?.data?.description : ''}
            >
              <TextArea placeholder="Nhập mô tả" showCount maxLength={200} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateTaskType
