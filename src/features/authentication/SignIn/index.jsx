import React, { useState } from 'react'
import { Form, Button, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import logoSomo from '../../../assets/logo_Somo.png'
import { postLogin } from 'features/slice/user/userSlice'
import { useDispatch } from 'react-redux'
import { authServices } from 'services/authServices'
import { createHub } from 'features/slice/hub/hubSlice'
import { requestForToken } from 'features/firebase'
import { toast } from 'react-toastify'
import { resetPassword } from 'features/slice/user/passwordSlice'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const onFinish = (values) => {
    setIsSubmitting(true)

    dispatch(postLogin(values))
      .then(() => {
        setIsSubmitting(false)

        if (authServices.getRole() === 'Manager') {
          navigate('/home')
          requestForToken()
          setTimeout(() => {
            const connectionId = localStorage.getItem('connectionId')
            dispatch(createHub(connectionId))
          }, 100)
        } else if (authServices.getRole() === 'Admin') {
          navigate('/statistic-farm')
        }
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }

  const onFinishForgotPassword = (values) => {
    setIsSubmitting(true)
    dispatch(resetPassword(values))
      .then(() => {
        setIsSubmitting(false)
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }

  const toggleForm = () => {
    setShowForgotPassword(!showForgotPassword)
    setIsSubmitting(false)
  }

  // Login form
  const renderLoginForm = () => (
    <Form name="login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
        style={{ margin: 0 }}
      >
        <Input className="fadeIn second" placeholder="Tên đăng nhập" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
      >
        <Input
          className="fadeIn third"
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login"
          disabled={isSubmitting}
          style={{ margin: 0 }}
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )

  // Forgot password form
  const renderForgotPasswordForm = () => (
    <Form
      name="forgotPassword"
      className="login-form"
      onFinish={onFinishForgotPassword}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập email để làm mới mật khẩu',
          },
          {
            type: 'email',
            message: 'Đây không phải email!',
          },
        ]}
      >
        <Input placeholder="Email" className="fadeIn second" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login"
          disabled={isSubmitting}
        >
          Gửi yêu cầu
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <div className="wrapper">
      <div className="fadeInDown">
        <div id="formContent">
          <h2 className="active">
            {showForgotPassword ? 'Quên mật khẩu' : 'Đăng nhập'}
          </h2>
          <div className="fadeIn first">
            <img src={logoSomo} id="icon" alt="User Icon" />
          </div>

          {showForgotPassword ? renderForgotPasswordForm() : renderLoginForm()}

          <div id="formFooter">
            {showForgotPassword ? (
              <a
                className="underlineHover"
                onClick={toggleForm}
                style={{ cursor: 'pointer' }}
              >
                Đăng nhập
              </a>
            ) : (
              <a
                className="underlineHover"
                onClick={toggleForm}
                style={{ cursor: 'pointer' }}
              >
                Quên mật khẩu ?
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
