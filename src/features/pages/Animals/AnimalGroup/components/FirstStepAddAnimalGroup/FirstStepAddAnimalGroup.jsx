import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getZoneByAreaAnimal } from 'features/slice/zone/zoneAnimalSlice'

const FirstStepAddAnimalGroup = ({
  isModalOpen,
  closeModal,
  areaByFarm,
  onFinishCreate,
}) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const zoneAnimal = useSelector((state) => state.zoneAnimal.data)

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaAnimal(selectedAreaId))
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
      status: 1,
    }
    onFinishCreate(finalValues)
    closeModal()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Tạo chuồng"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createAnimalGroup" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createAnimalGroup"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createAnimalGroup" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal-group"
          id="createAnimalGroup"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/*  Name */}
            <Form.Item
              label="Tên chuồng"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên chuồng',
                },
              ]}
            >
              <Input placeholder="Nhập tên chuồng" />
            </Form.Item>

            <Form.Item
              label="Mã chuồng"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã chuồng',
                },
              ]}
            >
              <Input placeholder="Nhập mã chuồng" />
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
                  zoneAnimal && zoneAnimal.data
                    ? zoneAnimal.data.map((item) => ({
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
export default FirstStepAddAnimalGroup
