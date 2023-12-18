import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Upload,
} from 'antd'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import {
  getDistrict,
  getWard,
  selectCities,
  selectDistricts,
  selectWards,
} from 'features/slice/location/locationSlice'
import { useDispatch } from 'react-redux'
import { Option } from 'antd/es/mentions'

const UpdateEmployee = ({
  isModalOpen,
  closeModal,
  selectedData,
  onFinishUpdate,
  employeeById,
  taskTypeActive,
  farmId,
}) => {
  const [fileList, setFileList] = useState([])
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  // --Location
  const cities = useSelector(selectCities)
  const districts = useSelector(selectDistricts)
  const wards = useSelector(selectWards)

  const [selectedCityCode, setSelectedCityCode] = useState(null)
  const [selectedDistrictCode, setSelectedDistrictCode] = useState(null)
  const [selectedWardCode, setSelectedWardCode] = useState(null)

  const [selectedCityName, setSelectedCityName] = useState('')
  const [selectedDistrictName, setSelectedDistrictName] = useState('')
  const [selectedWardName, setSelectedWardName] = useState('')

  useEffect(() => {
    if (employeeById?.data?.avatar) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: employeeById?.data?.avatar,
        },
      ])
    }
  }, [employeeById])

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  useEffect(() => {
    if (selectedData) {
      // Phân tích địa chỉ
      const addressParts = selectedData.address.split(', ')

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
  }, [selectedData, cities, dispatch, form])

  const onFinish = (values) => {
    if (values.dateOfBirth) {
      values.dateOfBirth = values.dateOfBirth.format('YYYY-MM-DD')
    }
    const address = `${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`
    const finalValues = {
      ...values,
      gender: values.gender === 'Male' ? false : true,
      id: selectedData.id,
      imageFile: fileList[0].originFileObj,
      address: address,
      farmId: farmId,
    }
    onFinishUpdate(finalValues)
    closeModal()
    form.resetFields()
  }

  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day')
  }

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

  return (
    <>
      <Modal
        title="Cập nhật thông tin nhân viên"
        open={isModalOpen}
        closeIcon
        onCancel={closeModal}
        footer={[
          <Button
            form="updateEmployee"
            type="primary"
            htmlType="reset"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="updateEmployee" type="primary" htmlType="submit">
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="updateEmployee"
          onFinish={onFinish}
        >
          <div className="form-left">
            <Form.Item
              label="Tên nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên nhân viên',
                },
              ]}
              name="name"
              initialValue={selectedData ? selectedData.name : ''}
            >
              <Input placeholder="Nhập tên nhân viên" />
            </Form.Item>

            <Form.Item
              label="Mã nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhân viên',
                },
              ]}
              name="code"
              initialValue={selectedData ? selectedData.code : ''}
            >
              <Input placeholder="Nhập mã khu vực" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại nhân viên',
                },
                () => ({
                  validator(_, value) {
                    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/
                    if (!value || phoneRegex.test(value)) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('Số điện thoại không hợp lệ')
                    )
                  },
                }),
              ]}
              initialValue={selectedData ? selectedData.phoneNumber : ''}
              name="phoneNumber"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính',
                },
              ]}
              name="gender"
              initialValue={selectedData ? selectedData.gender : ''}
            >
              <Radio.Group>
                <Radio value="Male">Nam</Radio>
                <Radio value="Female">Nữ</Radio>
              </Radio.Group>
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
              label="Hình ảnh công cụ"
              name="imageFile"
              className="material-image"
            >
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

            <Form.Item
              label="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày sinh',
                },
              ]}
              name="dateOfBirth"
              initialValue={
                selectedData ? dayjs(selectedData.dateOfBirth) : null
              }
            >
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                placeholder="Chọn ngày sinh"
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item
              label="Loại nhiệm vụ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại nhiệm vụ',
                },
              ]}
              name="taskTypeIds"
              initialValue={selectedData ? selectedData.taskTypeId : null}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="Chọn loại nhiệm vụ"
                options={taskTypeActive?.data?.map((taskType) => ({
                  label: taskType.name,
                  value: taskType.id,
                }))}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateEmployee
