import { Button, Form, Input, InputNumber, Modal, Radio, Select } from 'antd'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'
import { getZoneByAreaAnimal } from 'features/slice/zone/zoneAnimalSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdateAnimal = ({
  areaByFarm,
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdateAnimal,
  animalTypeActive,
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data)
  const fieldByZone = useSelector((state) => state.fieldByZone.data)

  useEffect(() => {
    if (isModalOpen && selectedData) {
      if (selectedData.areaId) {
        dispatch(getZoneByAreaAnimal(selectedData.areaId))
      }
      if (selectedData.zoneId) {
        dispatch(getFieldByZone(selectedData.zoneId))
      }
    }
  }, [isModalOpen, selectedData, dispatch])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaAnimal(selectedAreaId))
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
    setSelectedZoneId(value)
  }

  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value)
    
  }

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      name: values.name,
      externalId: values.externalId,
      weight: values.weight,
      gender: values.gender === 'Đực' ? true : false,
      habitantTypeId:
        typeof values.habitantType === 'object'
          ? values.habitantType.value
          : values.habitantType,
      fieldId:
        typeof values.field === 'object' ? values.field.value : values.field,
    }
    onFinishUpdateAnimal(finalValues)
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
            form="updateAnimal"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateAnimal" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateAnimal"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/* ID Animal */}
            <Form.Item
              label="Mã vật nuôi"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.externalId : ''}
              name="externalId"
            >
              <Input placeholder="Nhập mã vật nuôi" />
            </Form.Item>

            {/* Name Animal */}
            <Form.Item
              label="Tên vật nuôi"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên vật nuôi" />
            </Form.Item>

            {/* Animal Type */}
            <Form.Item
              label="Loại vật nuôi"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại vật nuôi',
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
                placeholder="Chọn loại vật nuôi"
                options={
                  animalTypeActive && animalTypeActive.data
                    ? animalTypeActive.data.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : null
                }
              ></Select>
            </Form.Item>

            {/* Weight */}
            <Form.Item
              label="Cân nặng vật nuôi (kg)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập cân nặng vật nuôi',
                },
              ]}
              initialValue={selectedData ? selectedData.weight : ''}
              name="weight"
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính vật nuôi',
                },
              ]}
              name="gender"
              initialValue={selectedData ? selectedData.gender : ''}
            >
              <Radio.Group>
                <Radio value="Đực">Đực/Trống</Radio>
                <Radio value="Cái">Cái/Mái</Radio>
              </Radio.Group>
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
                  zoneAnimal && zoneAnimal.data
                    ? zoneAnimal.data.map((item) => ({
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
              label="Chuồng"
              name="field"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn chuồng',
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
                placeholder="Chọn chuồng"
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
export default UpdateAnimal
