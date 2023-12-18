import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import TextArea from 'antd/es/input/TextArea'
import { Option } from 'antd/es/mentions'
import {
  getDistrict,
  getWard,
  selectCities,
  selectDistricts,
  selectWards,
} from 'features/slice/location/locationSlice'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const FormUpdateFarm = ({
  isModalOpenUpdate,
  closeModalUpdate,
  farmById,
  onFinishUpdate,
}) => {
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (farmById?.data?.urlImage) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: farmById?.data?.urlImage,
        },
      ])
    }
  }, [farmById])

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const cities = useSelector(selectCities)
  const districts = useSelector(selectDistricts)
  const wards = useSelector(selectWards)

  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const [selectedCityCode, setSelectedCityCode] = useState(null)
  const [selectedDistrictCode, setSelectedDistrictCode] = useState(null)
  const [selectedWardCode, setSelectedWardCode] = useState(null)

  const [selectedCityName, setSelectedCityName] = useState('')
  const [selectedDistrictName, setSelectedDistrictName] = useState('')
  const [selectedWardName, setSelectedWardName] = useState('')

  useEffect(() => {
    if (farmById?.data) {
      // Phân tích địa chỉ
      const addressParts = farmById?.data?.address.split(', ')
      const selectedCityName = addressParts[2]
      const selectedDistrictName = addressParts[1]
      const selectedWardName = addressParts[0]

      // Tìm kiếm và so sánh thành phố, quận/huyện
      const cityMatch = cities.find((city) => city.name === selectedCityName)
      if (cityMatch) {
        setSelectedCityCode(cityMatch.code)
        form.setFieldsValue({ city: cityMatch.code })
        setSelectedCityName(selectedCityName)
        dispatch(getDistrict(cityMatch.code)).then((newDistricts) => {
          const districtMatch = newDistricts.find(
            (district) => district.name === selectedDistrictName
          )

          if (districtMatch) {
            setSelectedDistrictCode(districtMatch.code)
            form.setFieldsValue({ district: districtMatch.code })

            dispatch(getWard(districtMatch.code)).then((newWards) => {
              const wardMatch = newWards.find(
                (ward) => ward.name === selectedWardName
              )
              if (wardMatch) {
                setSelectedWardCode(wardMatch.code)
                form.setFieldsValue({ ward: wardMatch.code })
              }
            })
          }
        })
      }
    }
  }, [farmById, cities, dispatch, form])

  const handleCityChange = async (value, option) => {
    setSelectedCityName(option.children)
    setSelectedCityCode(value)

    form.resetFields(['district', 'ward'])
    await dispatch(getDistrict(value))
  }

  const handleDistrictChange = async (value, option) => {
    setSelectedDistrictName(option.children)
    setSelectedDistrictCode(value)
    form.resetFields(['ward'])
    await dispatch(getWard(value))
  }

  const handleWardChange = (value, option) => {
    setSelectedWardName(option.children)
    form.setFieldsValue({ ward: option.children })
  }

  const onFinish = (values) => {
    const address = `${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`
    const finalValues = {
      ...values,
      id: farmById?.data?.id,
      imageFile: fileList[0].originFileObj,
      address: address,
    }
    onFinishUpdate(finalValues)
    closeModalUpdate()
    form.resetFields()
  }

  return (
    <Modal
      title="Cập nhật thông tin trang trại"
      open={isModalOpenUpdate}
      closeIcon
      onCancel={closeModalUpdate}
      footer={[
        <Button
          form="updateFarm"
          type="primary"
          htmlType="reset"
          danger
          onClick={closeModalUpdate}
        >
          Huỷ
        </Button>,
        <Button form="updateFarm" type="primary" htmlType="submit">
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        className="first-step-animal"
        id="updateFarm"
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
            initialValue={farmById ? farmById?.data?.name : ''}
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
            initialValue={farmById ? farmById?.data?.farmArea : 0}
          >
            <InputNumber min={0} addonAfter="m2" />
          </Form.Item>
          <Form.Item
            name="city"
            label="Tỉnh/Thành phố"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn Tỉnh/Thành phố',
              },
            ]}
            initialValue={selectedCityCode}
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
            initialValue={selectedDistrictCode}
          >
            <Select
              placeholder="Chọn Quận/Huyện/Thị xã"
              allowClear
              onChange={handleDistrictChange}
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
            initialValue={selectedWardCode}
          >
            <Select
              placeholder="Chọn Phường/Xã/Thị trấn"
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
            initialValue={farmById ? farmById?.data?.description : ''}
          >
            <TextArea placeholder="Nhập mô tả" showCount maxLength={400} />
          </Form.Item>

          <Form.Item label="Hình ảnh trang trại" name="imageFile">
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                fileList={fileList}
                onChange={onFileChange}
              >
                <UploadOutlined />
              </Upload>
            </ImgCrop>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}
export default FormUpdateFarm
