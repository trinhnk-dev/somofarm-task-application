import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'

const UpdateZone = ({
  areaByFarm,
  zoneType,
  onFinishUpdateZone,
  selectedData,
  isModalOpen,
  closeModal,
}) => {
  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      ...values,
    }
    onFinishUpdateZone(finalValues)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Cập nhật vùng"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateZone"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateZone" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateZone"
          onFinish={onFinish}
        >
          {/* Zone Name */}
          <div className="form-left">
            <Form.Item
              label="Tên vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vùng',
                },
              ]}
              name="name"
              initialValue={selectedData ? selectedData.name : ''}
            >
              <Input placeholder="Nhập tên vùng" />
            </Form.Item>

            {/* Area Code */}
            <Form.Item
              label="Mã vùng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã vùng',
                },
              ]}
              name="code"
              initialValue={selectedData ? selectedData.code : ''}
            >
              <Input placeholder="Nhập mã vùng" />
            </Form.Item>

            <Form.Item
              label="Diện tích (m2)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích khu vực',
                },
              ]}
              name="farmArea"
              initialValue={selectedData ? selectedData.farmArea : ''}
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
              initialValue={selectedData ? selectedData.zoneTypeId : ''}
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
              initialValue={selectedData ? selectedData.areaId : ''}
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
export default UpdateZone
