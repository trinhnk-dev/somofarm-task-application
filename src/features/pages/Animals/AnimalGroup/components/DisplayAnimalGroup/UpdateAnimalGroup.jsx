import { Button, Form, Select, Input, InputNumber, Modal } from 'antd'
import { getZoneByAreaAnimal } from 'features/slice/zone/zoneAnimalSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdateAnimalGroup = ({
  isModalOpen,
  closeModal,
  selectedData,
  areaByFarm,
  onFinishUpdate,
}) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [selectedAreaId, setSelectedAreaId] = useState(null)

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data)

  useEffect(() => {
    if (isModalOpen && selectedData) {
      if (selectedData.areaId) {
        dispatch(getZoneByAreaAnimal(selectedData.areaId))
      }
    }
  }, [isModalOpen, selectedAreaId, dispatch])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaAnimal(selectedAreaId))
      form.setFieldsValue({
        zone: null,
      })
    }
  }, [selectedAreaId, isModalOpen])

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value)
  }

  const onFinish = (values) => {
    const finalValues = {
      id: selectedData.id,
      name: values.name,
      status: 1,
      code: values.code,
      area: values.square,
      zoneId: typeof values.zone === 'object' ? values.zone.value : values.zone,
    }
    onFinishUpdate(finalValues)
    closeModal()
  }

  return (
    <>
      <Modal
        title="Cập nhật chuồng"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateAnimalGroup"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateAnimalGroup" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateAnimalGroup"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/* ID Animal */}
            <Form.Item
              label="Mã chuồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã chuồng',
                },
              ]}
              initialValue={selectedData ? selectedData.code : ''}
              name="code"
            >
              <Input placeholder="Nhập mã chuồng" />
            </Form.Item>

            {/* Name Animal */}
            <Form.Item
              label="Tên chuồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên chuồng',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên chuồng" />
            </Form.Item>

            {/* Area */}
            <Form.Item
              label="Diện tích chuồng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích chuồng',
                },
              ]}
              initialValue={selectedData ? selectedData.area : ''}
              name="square"
            >
              <InputNumber min={0} addonAfter="m2" />
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
                  : null
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
                  : null
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
              ></Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateAnimalGroup
