import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Option } from 'antd/es/mentions'
import { useSelector } from 'react-redux'
import {
  getCities,
  getDistrict,
  getWard,
  selectCities,
  selectDistricts,
  selectWards,
} from 'features/slice/location/locationSlice'
import { useDispatch } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'

const FormAddFarm = ({ closeModalAdd, isModalOpenAdd, onFinishCreate }) => {
  const [fileList, setFileList] = useState([])
  const [uploadError, setUploadError] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const [selectedCityName, setSelectedCityName] = useState('')
  const [selectedDistrictName, setSelectedDistrictName] = useState('')
  const [selectedWardName, setSelectedWardName] = useState('')

  const cities = useSelector(selectCities)
  const districts = useSelector(selectDistricts)
  const wards = useSelector(selectWards)

  useEffect(() => {
    dispatch(getCities())
  }, [dispatch])

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleFormReset = () => {
    form.resetFields()
    setFileList([]) // Resetting fileList to its initial state
    setUploadError(false)
  }

  //   location
  const handleCityChange = (value, option) => {
    setSelectedCityName(option.children)
    form.setFieldsValue({ district: null, ward: null })
    dispatch(getDistrict(value))
  }

  const handleDistrictChange = (value, option) => {
    setSelectedDistrictName(option.children)
    form.setFieldsValue({ ward: null })
    dispatch(getWard(value))
  }

  const handleWardChange = (value, option) => {
    setSelectedWardName(option.children)
    form.setFieldsValue({ ward: option.children })
  }

  const onFinish = (values) => {
    if (fileList.length === 0) {
      setUploadError(true)
      return
    }
    setUploadError(false)

    const address = `${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`

    const formData = {
      ...values,
      imageFile: fileList[0].originFileObj,
      address: address,
    }
    onFinishCreate(formData)
    closeModalAdd()
    handleFormReset()
  }
  return (
    <>
      <Modal
        title="Tạo mới trang trại"
        open={isModalOpenAdd}
        onCancel={closeModalAdd}
        footer={[
          <Button form="createFarm" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createFarm"
            type="primary"
            danger
            onClick={closeModalAdd}
          >
            Huỷ
          </Button>,
          <Button form="createFarm" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="createFarm"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/* Area Name */}
            <Form.Item
              label="Tên trang trại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên trang trại',
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập tên trang trại" />
            </Form.Item>

            <Form.Item
              label="Diện tích (m2)"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập diện tích trang trại',
                },
              ]}
              name="farmArea"
            >
              <InputNumber min={0} addonAfter="m2" />
            </Form.Item>

            <Form.Item
              label="Tỉnh/Thành phố"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn Tỉnh/Thành phố',
                },
              ]}
              name="city"
            >
              <Select
                placeholder="Chọn Tỉnh/Thành phố"
                onChange={handleCityChange}
                allowClear
              >
                {cities.map((city) => (
                  <Option key={city.code} value={city.code}>
                    {city.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Quận/Huyện/Thị xã"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn Quận/Huyện/Thị xã',
                },
              ]}
              name="district"
            >
              <Select
                placeholder="Chọn Quận/Huyện/Thị xã"
                onChange={handleDistrictChange}
                allowClear
              >
                {districts.map((district) => (
                  <Option key={district.code} value={district.code}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Phường/Xã"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn Phường/Xã/Thị trấn',
                },
              ]}
              name="ward"
            >
              <Select
                placeholder="Chọn Phường/Xã/Thị trấn"
                // onChange={(value) => form.setFieldsValue({ ward: value })}
                onChange={handleWardChange}
                allowClear
              >
                {wards.map((ward) => (
                  <Option key={ward.code} value={ward.code}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="form-right">
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mô tả',
                },
              ]}
            >
              <TextArea placeholder="Nhập mô tả" showCount maxLength={200} />
            </Form.Item>

            <Form.Item label="Hình ảnh trang trại" required>
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  fileList={fileList}
                  onChange={onFileChange}
                  beforeUpload={() => false}
                >
                  <UploadOutlined />
                </Upload>
              </ImgCrop>
              {uploadError && (
                <div style={{ color: 'red' }}>
                  Vui lòng tải lên hình ảnh công cụ
                </div>
              )}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default FormAddFarm
