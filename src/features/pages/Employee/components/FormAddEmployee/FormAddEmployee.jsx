import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Upload,
  Space,
  Select,
} from 'antd'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
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
import { Option } from 'antd/es/mentions'

const FormAddEmployee = ({
  isModalOpen,
  closeModal,
  onFinishCreate,
  farmId,
  taskTypeActive,
}) => {
  const dispatch = useDispatch()
  const [fileList, setFileList] = useState([])
  const [uploadError, setUploadError] = useState(false)
  const [form] = Form.useForm()

  const [selectedCityName, setSelectedCityName] = useState('')
  const [selectedDistrictName, setSelectedDistrictName] = useState('')
  const [selectedWardName, setSelectedWardName] = useState('')

  // --Location
  const cities = useSelector(selectCities)
  const districts = useSelector(selectDistricts)
  const wards = useSelector(selectWards)

  useEffect(() => {
    dispatch(getCities())
  }, [dispatch])

  // Image
  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleFormReset = () => {
    form.resetFields()
    setFileList([])
    setUploadError(false)
  }

  // finish
  const onFinish = (values) => {
    if (fileList.length === 0) {
      setUploadError(true)
      return
    }
    setUploadError(false)

    const address = `${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`

    const finalValues = {
      ...values,
      imageFile: fileList[0].originFileObj,
      farmId: farmId,
      address: address,
    }
    onFinishCreate(finalValues)
    closeModal()
    handleFormReset()
  }

  // validate Date
  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day')
  }

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

  // const handleWardChange = (value) => {
  //   setSelectedWard(value)
  // }

  const handleWardChange = (value, option) => {
    setSelectedWardName(option.children)
    form.setFieldsValue({ ward: option.children })
  }

  return (
    <>
      <Modal
        title="Thêm nhân viên"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button form="createEmployee" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="createEmployee"
            type="primary"
            danger
            onClick={closeModal}
          >
            Huỷ
          </Button>,
          <Button form="createEmployee" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="createEmployee"
          onFinish={onFinish}
          form={form}
        >
          <div className="form-left">
            {/* Tên */}
            <Form.Item
              label="Tên nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên nhân viên',
                },
              ]}
              name="name"
            >
              <Input placeholder="Nhập tên nhân viên" />
            </Form.Item>

            {/* Mã */}
            <Form.Item
              label="Mã nhân viên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhân viên',
                },
              ]}
              name="code"
            >
              <Input placeholder="Nhập mã nhân viên" />
            </Form.Item>

            {/* Số điện thoại */}
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
              name="phoneNumber"
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            {/* Giới tính */}
            <Form.Item
              label="Giới tính"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn giới tính',
                },
              ]}
              name="gender"
            >
              <Radio.Group>
                <Radio value={false}>Nam</Radio>
                <Radio value={true}>Nữ</Radio>
              </Radio.Group>
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
            <Form.Item label="Hình ảnh nhân viên" required>
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
                  Vui lòng tải lên hình ảnh nhân viên
                </div>
              )}
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
            >
              <DatePicker
                // format="YYYY-MM-DD[T]HH:mm:ss:SSS"
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
export default FormAddEmployee
