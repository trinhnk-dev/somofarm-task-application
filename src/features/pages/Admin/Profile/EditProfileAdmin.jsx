import React, { useEffect, useState } from 'react'
import { UploadOutlined } from "@ant-design/icons";
import {
    getDistrict,
    getWard,
    selectCities,
    selectDistricts,
    selectWards,
  } from "../../../../features/slice/location/locationSlice";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { Option } from 'antd/es/mentions';

const EditProfileAdmin = ({
    isModalEditVisible,
    closeEditProfile,
    handleEditProfile,
    fileList,
    onFileChange,
    admin,
    isSubmitting,
    setSelectedCityName,
    setSelectedDistrictName,
    setSelectedWardName
  }) => {
    const [form] = Form.useForm();
  
    const dispatch = useDispatch();
  
    const cities = useSelector(selectCities);
    const districts = useSelector(selectDistricts);
    const wards = useSelector(selectWards);
  
    const [selectedCityCode, setSelectedCityCode] = useState(null);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState(null);
    const [selectedWardCode, setSelectedWardCode] = useState(null);
  
    useEffect(() => {
      if (admin) {
        // Phân tích địa chỉ
        const addressParts = admin.address ? admin.address.split(", ") : null;
  
        const selectedCityName = addressParts ? addressParts[2] : null;
        const selectedDistrictName = addressParts ? addressParts[1] : null;
        const selectedWardName = addressParts ? addressParts[0] : null;
  
        // Tìm kiếm và so sánh thành phố, quận/huyện
        const cityMatch = cities.find((city) => city.name === selectedCityName);
        if (cityMatch) {
          setSelectedCityCode(cityMatch.code);
          form.setFieldsValue({ city: cityMatch.code });
          setSelectedCityName(selectedCityName);
          dispatch(getDistrict(cityMatch.code)).then((newDistricts) => {
            const districtMatch = newDistricts.find(
              (district) => district.name === selectedDistrictName
            );
  
            if (districtMatch) {
              setSelectedDistrictCode(districtMatch.code);
              form.setFieldsValue({ district: districtMatch.code });
  
              dispatch(getWard(districtMatch.code)).then((newWards) => {
                const wardMatch = newWards.find(
                  (ward) => ward.name === selectedWardName
                );
                if (wardMatch) {
                  setSelectedWardCode(wardMatch.code);
                  form.setFieldsValue({ ward: wardMatch.code });
                }
              });
            }
          });
        }
      }
    }, [admin, cities, dispatch, form]);
  
    const handleCityChange = async (value, option) => {
      setSelectedCityName(option.children);
      setSelectedCityCode(value);
  
      form.resetFields(["district", "ward"]);
      await dispatch(getDistrict(value));
    };
  
    const handleDistrictChange = async (value, option) => {
      setSelectedDistrictName(option.children);
      setSelectedDistrictCode(value);
      form.resetFields(["ward"]);
      await dispatch(getWard(value));
    };
  
    const handleWardChange = (value, option) => {
      setSelectedWardName(option.children);
      form.setFieldsValue({ ward: option.children });
    };
  
    return (
      <>
        {isModalEditVisible && (
          <Modal
            title="Sửa thông tin"
            open={isModalEditVisible}
            onCancel={closeEditProfile}
            footer={[
              <Button onClick={closeEditProfile}>Đóng</Button>,
              <Button
                form="updateEffort"
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
              >
                Lưu thay đổi
              </Button>,
            ]}
          >
            <Form
              layout="vertical"
              onFinish={handleEditProfile}
              id="updateEffort"
            >
              <Form.Item
                label="Hình đại diện"
                name="imageFile"
                className="edit-avatar"
              >
                <Upload
                  listType="picture-circle"
                  maxCount={1}
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={onFileChange}
                  onRemove="false"
                >
                  <UploadOutlined />
                </Upload>
              </Form.Item>
              <Form.Item
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}
                initialValue={admin ? admin.name : null}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
              <Form.Item
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  },
                ]}
                name="email"
                initialValue={admin ? admin.email : null}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                ]}
                name="phoneNumber"
                initialValue={admin ? admin.phoneNumber : null}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              {/* <Form.Item
                name="city"
                label="Tỉnh/Thành phố"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Tỉnh/Thành phố",
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
                    message: "Vui lòng chọn Quận/Huyện/Thị xã",
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
                    message: "Vui lòng chọn Phường/Xã/Thị trấn",
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
              </Form.Item> */}
            </Form>
          </Modal>
        )}
      </>
    );
  };

export default EditProfileAdmin