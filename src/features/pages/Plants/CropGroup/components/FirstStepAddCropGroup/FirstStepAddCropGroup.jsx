import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'

const FirstStepAddCropGroup = ({
  isModalOpen,
  closeModal,
  areaByFarm,
  onFinishCreate,
}) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [selectedAreaId, setSelectedAreaId] = useState(null)

  const zonePlant = useSelector((state) => state.zonePlant.data)

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId))
    }
  }, [selectedAreaId])

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value)
    form.setFieldsValue({
      zoneId: null,
    })
  }

  const onFinish = (values) => {
    const finalValues = {
      ...values,
      status: 0,
    }
    onFinishCreate(finalValues)
    closeModal()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Tạo vườn"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createCropGroup" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createCropGroup"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createCropGroup" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-crop-group"
          id="createCropGroup"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/*  Name */}
            <Form.Item
              label="Tên vườn"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vườn',
                },
              ]}
            >
              <Input placeholder="Nhập tên vườn" />
            </Form.Item>

            {/*  Code */}
            <Form.Item
              label="Mã vườn"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã vườn',
                },
              ]}
            >
              <Input placeholder="Nhập mã vườn" />
            </Form.Item>

            {/* Square*/}
            <Form.Item
              label="Diện tích"
              name="area"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} addonAfter="m2" min={0} />
            </Form.Item>
          </div>

          <div className="form-right">
            {/* Area */}
            <Form.Item
              label="Khu vực"
              name="areaId"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn khu vực',
                },
              ]}
            >
              <Select
                placeholder="Chọn khu vực"
                options={
                  areaByFarm && areaByFarm.data
                    ? areaByFarm.data.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : null
                }
                onChange={handleSelectAreaChange}
              ></Select>
            </Form.Item>

            {/* Zone */}
            <Form.Item
              label="Vùng"
              name="zoneId"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn vùng',
                },
              ]}
            >
              <Select
                placeholder="Chọn vùng"
                options={
                  zonePlant && zonePlant.data
                    ? zonePlant.data.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : null
                }
              ></Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FirstStepAddCropGroup
