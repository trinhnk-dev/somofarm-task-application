import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Radio, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getFieldByZone } from 'features/slice/field/fieldByZoneSlice'
import { getZoneByAreaAnimal } from 'features/slice/zone/zoneAnimalSlice'

const FirstStepAddAnimal = ({
  areaByFarm,
  isModalOpen,
  closeModal,
  onFinishCreateAnimal,
  animalTypeActive,
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [selectedAreaId, setSelectedAreaId] = useState(null)
  const [selectedZoneId, setSelectedZoneId] = useState(null)

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data)
  const fieldByZone = useSelector((state) => state.fieldByZone.data)

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaAnimal(selectedAreaId))
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
    const finalValues = {
      name: values.name,
      externalId: values.externalId,
      weight: values.weight,
      gender: values.gender,
      habitantTypeId: values.habitantTypeId,
      fieldId: values.fieldId,
    }
    onFinishCreateAnimal(finalValues)
    closeModal()
    form.resetFields()
  }

  return (
    <>
      <Modal
        title="Thêm mới vật nuôi"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createAnimal" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createAnimal"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createAnimal" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="createAnimal"
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
              name="habitantTypeId"
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
            <Form.Item label="Cân nặng vật nuôi (kg)" name="weight">
              <InputNumber min={0} addonAfter="kg" />
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
            >
              <Radio.Group>
                <Radio value={true}>Đực/Trống</Radio>
                <Radio value={false}>Cái/Mái</Radio>
              </Radio.Group>
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
                onChange={handleSelectZoneChange}
              ></Select>
            </Form.Item>

            {/* Field */}
            <Form.Item
              label="Chuồng"
              name="fieldId"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn chuồng',
                },
              ]}
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
export default FirstStepAddAnimal
