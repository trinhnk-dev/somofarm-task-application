import { Button, Form, Select, Input, InputNumber, Modal } from 'antd'
import { getAreaActive } from 'features/slice/area/areaSlice'
import { updateHabitantType } from 'features/slice/habitant/habitantTypeSlice'
import { getZoneByAreaPlant } from 'features/slice/zone/zonePlantSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdateCropGroup = ({
  isModalOpen,
  closeModal,
  selectedData,
  areaByFarm,
  onFinishUpdate,
}) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [selectedAreaId, setSelectedAreaId] = useState(null)

  const zonePlant = useSelector((state) => state.zonePlant.data)

  useEffect(() => {
    if (isModalOpen && selectedData) {
      if (selectedData.areaId) {
        dispatch(getZoneByAreaPlant(selectedData.areaId))
      }
    }
  }, [isModalOpen, selectedAreaId, dispatch])

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaPlant(selectedAreaId))
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
      status: 0,
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
        title="Cập nhật vườn"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updatePlantGroup"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updatePlantGroup" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updatePlantGroup"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            <Form.Item
              label="Mã vườn"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã chuồng',
                },
              ]}
              initialValue={selectedData ? selectedData.code : ''}
              name="code"
            >
              <Input placeholder="Nhập mã vườn" />
            </Form.Item>

            {/* Name Animal */}
            <Form.Item
              label="Tên vườn"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vườn',
                },
              ]}
              initialValue={selectedData ? selectedData.name : ''}
              name="name"
            >
              <Input placeholder="Nhập tên vườn" />
            </Form.Item>

            {/* Area */}
            <Form.Item
              label="Diện tích vườn"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích vườn',
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
              ></Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateCropGroup
