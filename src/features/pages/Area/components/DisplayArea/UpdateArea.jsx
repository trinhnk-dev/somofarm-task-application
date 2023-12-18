import { Button, Form, Input, InputNumber, Modal } from 'antd'

const UpdateArea = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdate,
}) => {
  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      ...values,
    }
    onFinishUpdate(finalValues)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Cập nhật khu vực"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateArea"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateArea" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-area"
          id="updateArea"
          onFinish={onFinish}
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
            initialValue={selectedData ? selectedData.name : ''}
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
            initialValue={selectedData ? selectedData.code : ''}
          >
            <Input placeholder="Nhập mã khu vực" />
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
            initialValue={selectedData ? selectedData.fArea : ''}
          >
            <InputNumber min={0} addonAfter="m2" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateArea
