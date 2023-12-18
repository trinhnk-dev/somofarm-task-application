import Notification from 'common/components/Notification'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppRoute from 'router/AppRoute'
import { ConfigProvider } from 'antd'
import vietnamese from 'antd/locale/vi_VN'
import 'dayjs/locale/vi'

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={vietnamese}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </ConfigProvider>

      <Notification />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{ width: '300px', minHeight: '80px', fontSize: '16px' }}
      />
    </div>
  )
}

export default App
