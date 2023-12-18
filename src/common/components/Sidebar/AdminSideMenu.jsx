import React, { useEffect, useState } from 'react'

import {
  Avatar,
  Button,
  Drawer,
  Form,
  Input,
  Layout,
  Menu,
  Popover,
  Space,
} from 'antd'
import {
  BorderOutlined,
  TableOutlined,
  MenuOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from '@ant-design/icons'
import logoSomo from '../../../assets/logo_Somo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authServices } from 'services/authServices'
import { toast } from 'react-toastify'
import {
  useDesktopMediaQuery,
  useTabletMediaQuery,
} from 'common/hooks/responsive'
import { GiCow, GiPlantSeed, GiDarkSquad, GiSpade } from 'react-icons/gi'
import { VscScreenFull } from 'react-icons/vsc'
import { FaMapLocationDot } from 'react-icons/fa6'
import SubMenu from 'antd/es/menu/SubMenu'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getMemberById, updatePassword } from 'features/slice/user/memberSlice'
import { getAdminById } from 'features/slice/user/adminSlice'

const { Sider } = Layout

const AdminSideMenu = () => {
  const [userName, setUserName] = useState()
  const [userRole, setUserRole] = useState()
  const [collapsed, setCollapsed] = useState(false)
  const [changePasswordDrawer, setChangePasswordDrawer] = useState(false)
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
  const [newPasswordVisible, setNewPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [oldPasswordValue, setOldPasswordValue] = useState('')
  const [newPasswordValue, setNewPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const isDesktop = useDesktopMediaQuery()
  const isTablet = useTabletMediaQuery()

  const adminData = useSelector((state) => state.admin.data)

  useEffect(() => {
    dispatch(getAdminById(authServices.getUserId()))
  }, [dispatch])

  useEffect(() => {
    const role = authServices.getRole()
    setUserRole(role)
    const userName = authServices.getUserName()
    setUserName(userName)
  }, [])

  const handleChangePassword = (e) => {
    setOldPasswordValue(e.target.value)
  }

  const handleChangeNewPassword = (e) => {
    setNewPasswordValue(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPasswordValue(e.target.value)
  }

  const handleSubmitChangePassword = (values) => {
    const updatedPassword = {
      ...values,
      id: adminData.id,
      oldPassword: oldPasswordValue,
      password: newPasswordValue,
      confirmPassword: confirmPasswordValue,
    }
    dispatch(updatePassword(updatedPassword)).then(() => {
      setChangePasswordDrawer(false)
      dispatch(getAdminById(authServices.getUserId()))
      setOldPasswordValue('')
      setNewPasswordValue('')
      setConfirmPasswordValue('')
    })
  }

  const logout = () => {
    authServices.logOut()
    toast.success('Đăng xuất thành công')
    navigate('/login')
  }

  return (
    <div className="sider-admin">
      {isDesktop && (
        <Sider
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logoSomo">
            <img src={logoSomo} alt="logo" />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/dashboard" className="menu-admin">
              <VscScreenFull />
              <span>Tổng quan</span>
              <Link to="/dashboard"></Link>
            </Menu.Item>

            <Menu.Item key="/farm-dash" className="menu-admin">
              <FaMapLocationDot />
              <span>Chọn trang trại</span>
              <Link to="/farm-dash"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-area">
              <BorderOutlined />
              <span>Khu vực</span>
              <Link to="/statistic-area"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-zone">
              <TableOutlined />
              <span>Vùng</span>
              <Link to="/statistic-zone"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-animal-group" className="menu-admin">
              <GiCow />
              <span>Động vật</span>
              <Link to="/statistic-animal-group"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-crop-group" className="menu-admin">
              <GiPlantSeed />
              <span>Thực vật</span>
              <Link to="/statistic-crop-group"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-material" className="menu-admin">
              <GiSpade />
              <span>Công cụ</span>
              <Link to="/statistic-material"></Link>
            </Menu.Item>

            <Menu.Item key="/statistic-member" className="menu-admin">
              <GiDarkSquad />
              <span>Nhân sự</span>
              <Link to="/statistic-member"></Link>
            </Menu.Item>

            <SubMenu
              key="profile"
              title={
                <Space>
                  <Avatar shape="circle" size="small" src={adminData?.avatar} />
                  <p>{adminData?.name}</p>
                </Space>
              }
            >
              <Menu.Item key="/admin-profile">
                <InfoCircleOutlined />
                <span>Thông tin</span>
                <Link to="/admin-profile"></Link>
              </Menu.Item>

              <Menu.Item
                key="/changePassword"
                onClick={() => setChangePasswordDrawer(true)}
              >
                <EditOutlined />
                <span>Đổi mật khẩu</span>
              </Menu.Item>

              <Menu.Item key="/login" onClick={logout}>
                <LogoutOutlined />
                <span>Đăng xuất</span>
                <Link to="/login"></Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      )}
      {isTablet && (
        <div className="header-tablet">
          <div className="logoSomo">
            <img src={logoSomo} alt="logo" />
          </div>
          <div className="menu-popover">
            <Popover
              placement="bottomRight"
              content={
                <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={[location.pathname]}
                >
                  <Menu.Item key="/dashboard" className="menu-admin">
                    <VscScreenFull />
                    <span>Tổng quan</span>
                    <Link to="/dashboard"></Link>
                  </Menu.Item>

                  {/* <Menu.Item key="/statistic-task">
              <AimOutlined />
              <span>Công việc</span>
              <Link to="/statistic-task"></Link>
            </Menu.Item> */}

                  {/* <Menu.Item key="/statistic-farm">
              <BorderOutlined />
              <span>Chọn trang trại</span>
              <Link to="/statistic-farm"></Link>
            </Menu.Item> */}

                  <Menu.Item key="/farm-dash" className="menu-admin">
                    <FaMapLocationDot />
                    <span>Chọn trang trại</span>
                    <Link to="/farm-dash"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-area">
                    <BorderOutlined />
                    <span>Khu vực</span>
                    <Link to="/statistic-area"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-zone">
                    <TableOutlined />
                    <span>Vùng</span>
                    <Link to="/statistic-zone"></Link>
                  </Menu.Item>

                  {/* <Menu.Item key="/statistic-animal">
              <TeamOutlined />
              <span>Vật nuôi</span>
              <Link to="/statistic-animal"></Link>
            </Menu.Item> */}

                  <Menu.Item
                    key="/statistic-animal-group"
                    className="menu-admin"
                  >
                    <GiCow />
                    <span>Động vật</span>
                    <Link to="/statistic-animal-group"></Link>
                  </Menu.Item>

                  {/* <Menu.Item key="/statistic-plant">
              <DashboardOutlined />
              <span>Cây trồng</span>
              <Link to="/statistic-plant"></Link>
            </Menu.Item> */}

                  <Menu.Item key="/statistic-crop-group" className="menu-admin">
                    <GiPlantSeed />
                    <span>Thực vật</span>
                    <Link to="/statistic-crop-group"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-material" className="menu-admin">
                    <GiSpade />
                    <span>Công cụ</span>
                    <Link to="/statistic-material"></Link>
                  </Menu.Item>

                  <Menu.Item key="/statistic-member" className="menu-admin">
                    <GiDarkSquad />
                    <span>Nhân sự</span>
                    <Link to="/statistic-member"></Link>
                  </Menu.Item>

                  <SubMenu
                    key="profile"
                    title={
                      <Space>
                        <Avatar
                          shape="circle"
                          size="small"
                          src={adminData?.avatar}
                        />
                        <p>{adminData?.name}</p>
                      </Space>
                    }
                  >
                    <Menu.Item key="/admin-profile">
                      <InfoCircleOutlined />
                      <span>Thông tin</span>
                      <Link to="/admin-profile"></Link>
                    </Menu.Item>

                    <Menu.Item
                      key="/changePassword"
                      onClick={() => setChangePasswordDrawer(true)}
                    >
                      <EditOutlined />
                      <span>Đổi mật khẩu</span>
                    </Menu.Item>

                    <Menu.Item key="/login" onClick={logout}>
                      <LogoutOutlined />
                      <span>Đăng xuất</span>
                      <Link to="/login"></Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              }
              trigger="click"
            >
              <Button>
                <MenuOutlined />
              </Button>
            </Popover>
          </div>
        </div>
      )}
      {changePasswordDrawer && (
        <Drawer
          title="Đổi mật khẩu"
          placement="right"
          width={400}
          onClose={() => setChangePasswordDrawer(false)}
          open={changePasswordDrawer}
          extra={
            <Space>
              <Button type="primary" htmlType="submit" form="changePassword">
                Đổi
              </Button>
            </Space>
          }
          zIndex={2000}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form
              layout="vertical"
              onFinish={handleSubmitChangePassword}
              id="changePassword"
              form={form}
            >
              <Form.Item
                label="Mật khẩu hiện tại"
                name="oldPassword"
                required
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu hiện tại',
                  },
                ]}
              >
                <Space direction="horizontal">
                  <Input.Password
                    placeholder="Nhập mật khẩu hiện tại"
                    value={oldPasswordValue}
                    onChange={handleChangePassword}
                    visibilityToggle={{
                      visible: oldPasswordVisible,
                      onVisibleChange: setOldPasswordVisible,
                    }}
                  />
                  <Button
                    style={{
                      width: 80,
                    }}
                    onClick={() =>
                      setOldPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {oldPasswordVisible ? 'Ẩn' : 'Hiện'}
                  </Button>
                </Space>
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="password"
                required
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu mới',
                  },
                ]}
              >
                <Space direction="horizontal">
                  <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    value={newPasswordValue}
                    onChange={handleChangeNewPassword}
                    visibilityToggle={{
                      visible: newPasswordVisible,
                      onVisibleChange: setNewPasswordVisible,
                    }}
                  />
                  <Button
                    style={{
                      width: 80,
                    }}
                    onClick={() =>
                      setNewPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {newPasswordVisible ? 'Ẩn' : 'Hiện'}
                  </Button>
                </Space>
              </Form.Item>
              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="confirmPassword"
                required
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu',
                  },
                ]}
              >
                <Space direction="horizontal">
                  <Input.Password
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmPasswordValue}
                    onChange={handleConfirmPassword}
                    visibilityToggle={{
                      visible: confirmPasswordVisible,
                      onVisibleChange: setConfirmPasswordVisible,
                    }}
                  />
                  <Button
                    style={{
                      width: 80,
                    }}
                    onClick={() =>
                      setConfirmPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {confirmPasswordVisible ? 'Ẩn' : 'Hiện'}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Drawer>
      )}
    </div>
  )
}

export default AdminSideMenu
