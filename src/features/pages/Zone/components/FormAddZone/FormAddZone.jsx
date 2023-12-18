import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'

const FormAddZone = ({
  isModalOpen,
  closeModal,
  onFinishCreateZone,
  areaByFarm,
  zoneType,
}) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    onFinishCreateZone(values)
    closeModal()
    form.resetFields()
  }
  return (
    <>
      <Modal
        title="Thêm vùng"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createZone" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button form="createZone" type="primary" danger onClick={closeModal}>
            Huỷ
          </Button>,
          <Button form="createZone" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="createZone"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/* Name Animal */}
            <Form.Item
              label="Tên vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vùng',
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập tên vùng" />
            </Form.Item>

            <Form.Item
              label="Mã vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã vùng',
                },
              ]}
              name="code"
            >
              <Input placeholder="Nhập mã vùng" />
            </Form.Item>

            {/* Area */}
            <Form.Item
              label="Diện tích vùng (m2)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập cân nặng vật nuôi',
                },
              ]}
              name="farmArea"
            >
              <InputNumber min={0} addonAfter="m2" />
            </Form.Item>
          </div>

          <div className="form-right">
            <Form.Item
              label="Loại vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại vùng',
                },
              ]}
              name="zoneTypeId"
            >
              <Select
                placeholder="Chọn loại vùng"
                options={zoneType?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              ></Select>
            </Form.Item>

            {/* Area */}
            <Form.Item
              label="Khu vực"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn khu vực',
                },
              ]}
              name="areaId"
            >
              <Select
                placeholder="Chọn khu vực"
                options={areaByFarm?.data?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              ></Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddZone
