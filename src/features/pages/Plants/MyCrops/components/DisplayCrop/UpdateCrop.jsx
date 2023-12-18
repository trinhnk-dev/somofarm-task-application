import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'
import { getPlantTypeActive } from 'features/slice/plant/plantTypeActiveSlice'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdateCrop = ({
  areaByFarm,
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdatePlant,
  plantTypeActive,
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)

  const zonePlant = useSelector((state) => state.zonePlant.data)

  const fieldByZone = useSelector((state) => state.fieldByZone.data)

  useEffect(() => {
    if (isModalOpen && selectedData) {
      if (selectedData.areaId) {
        dispatch(getZoneByAreaPlant(selectedData.areaId))
      }
      if (selectedData.zoneId) {
        dispatch(getFieldByZone(selectedData.zoneId))
      }
    }
  }, [isModalOpen, selectedData, dispatch])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId))
      form.setFieldsValue({
        zone: null,
        field: null,
      })
    }
  }, [selectedAreaId, isModalOpen])

  useEffect(() => {
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId))
      form.setFieldsValue({
        field: null,
      })
    }
  }, [selectedZoneId, isModalOpen])

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value)
  }

  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value)
  }

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      name: values.name,
      externalId: values.externalId,
      height: values.height,
      habitantTypeId:
        typeof values.habitantType === 'object'
          ? values.habitantType.value
          : values.habitantType,
      fieldId:
        typeof values.field === 'object' ? values.field.value : values.field,
    }
    onFinishUpdatePlant(finalValues)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Cập nhật vật nuôi"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updatePlant"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updatePlant" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-plant"
          id="updatePlant"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/* ID Animal */}
            <Form.Item
              label="Mã cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã cây trồng',
                },
              ]}
              initialValue={selectedData ? selectedData.externalId : ''}
              name="externalId"
            >
              <Input placeholder="Nhập mã cây trồng" />
            </Form.Item>

            {/* Name Animal */}
            <Form.Item
              label="Tên cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên cây trồng',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên cây trồng" />
            </Form.Item>

            {/* Animal Type */}
            <Form.Item
              label="Loại cây trồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại cây trồng',
                },
              ]}
              name="habitantType"
              initialValue={
                selectedData
                  ? {
                      label: selectedData.habitantTypeName,
                      value: selectedData.habitantTypeId,
                    }
                  : ''
              }
            >
              <Select
                placeholder="Chọn loại cây trồng"
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

            {/* Height */}
            <Form.Item
              label="Chiều cao cây trồng (m)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập cân nặng vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.height : ''}
              name="height"
            >
              <InputNumber min={0} addonAfter="m" />
            </Form.Item>
          </div>

          <div className="form-right">
            {/* Area */}
            <Form.Item
              label="Khu vực"
              name="area"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn khu vực',
                },
              ]}
              initialValue={
                selectedData
                  ? {
                      label: selectedData.areaName,
                      value: selectedData.areaId,
                    }
                  : ''
              }
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
              name="zone"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn vùng',
                },
              ]}
              initialValue={
                selectedData
                  ? {
                      label: selectedData.zoneName,
                      value: selectedData.zoneId,
                    }
                  : ''
              }
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
              name="field"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn vườn',
                },
              ]}
              initialValue={
                selectedData
                  ? {
                      label: selectedData.fieldName,
                      value: selectedData.fieldId,
                    }
                  : ''
              }
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
export default UpdateCrop
