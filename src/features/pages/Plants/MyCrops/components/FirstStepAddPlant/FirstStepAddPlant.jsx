import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { getPlantTypeActive } from 'features/slice/plant/plantTypeActiveSlice'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'

const FirstStepAddPlant = ({
  isModalOpen,
  closeModal,
  areaByFarm,
  onFinishCreatePlant,
  plantTypeActive,
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)

  const zonePlant = useSelector((state) => state.zonePlant.data)
  const fieldByZone = useSelector((state) => state.fieldByZone.data)

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId))
      form.setFieldsValue({
        zoneId: null,
        fieldId: null,
      })
    }
  }, [selectedAreaId])

  useEffect(() => {
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId))
      form.setFieldsValue({
        fieldId: null,
      })
    }
  }, [selectedZoneId])

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value)
  }

  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value)
  }

  const onFinish = (values) => {
    onFinishCreatePlant(values)
    closeModal()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Tạo mới cây trồng"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createPlant" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button form="createPlant" type="primary" danger onClick={closeModal}>
            Huỷ
          </Button>,
          <Button form="createPlant" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-plant"
          id="createPlant"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/* ID Plant */}
            <Form.Item
              label="Mã cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã cây trồng',
                },
              ]}
              name="externalId"
            >
              <Input placeholder="Nhập mã cây trồng" />
            </Form.Item>

            {/* Plant  Name */}
            <Form.Item
              label="Tên cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên cây trồng',
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập tên cây trồng" />
            </Form.Item>

            {/* Plant Type */}
            <Form.Item
              label="Loại cây"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại cây trồng',
                },
              ]}
              name="habitantTypeId"
            >
              <Select
                placeholder="Chọn loại cây"
                options={
                  plantTypeActive && plantTypeActive.data
                    ? plantTypeActive.data.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : null
                }
              ></Select>
            </Form.Item>

            {/* Height Name */}
            <Form.Item
              label="Chiều cao cây trồng (m)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập chiều cao cây trồng',
                },
              ]}
              name="height"
            >
              <InputNumber min={0} />
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
                onChange={handleSelectZoneChange}
              ></Select>
            </Form.Item>

            {/* Field */}
            <Form.Item
              label="Vườn"
              name="fieldId"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn vườn',
                },
              ]}
            >
              <Select
                placeholder="Chọn vườn"
                options={
                  fieldByZone && fieldByZone.data
                    ? fieldByZone.data.map((item) => ({
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
export default FirstStepAddPlant
