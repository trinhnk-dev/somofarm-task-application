import { Button, Dropdown, Menu } from 'antd'
import FormAddTaskType from './FormAddTaskType'
import { useState } from 'react'
import Search from 'antd/es/input/Search'
import FormUploadExcel from './FormUploadExcel'
import {
  DashOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  FileExcelOutlined,
} from '@ant-design/icons'

const AddTaskType = ({
  onFinishCreateTaskType,
  getTemplate,
  getTaskTypeByExcel,
  onFinishCreateTaskTypeExcel,
  handleSearch,
}) => {
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const openModalType = () => {
    setIsModalOpenType(true)
  }

  const closeModalType = () => {
    setIsModalOpenType(false)
  }

  const [isModalOpenExcel, setIsModalOpenExcel] = useState(false)

  const openModalExcel = () => {
    setIsModalOpenExcel(true)
  }

  const closeModalExcel = () => {
    setIsModalOpenExcel(false)
  }

  // ----------------------------------------------
  const getTaskTypeTemplate = () => {
    getTemplate()
  }

  const getTaskTypeExcel = () => {
    getTaskTypeByExcel()
  }

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={getTaskTypeTemplate}
        icon={<DownloadOutlined style={{ color: 'green', fontSize: '14px' }} />}
        style={{ fontSize: '14px' }}
      >
        Tải tệp excel mẫu
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={getTaskTypeExcel}
        icon={
          <ClockCircleOutlined style={{ color: 'blue', fontSize: '14px' }} />
        }
        style={{ fontSize: '14px' }}
      >
        Tải xuống loại công việc
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={openModalExcel}
        icon={
          <FileExcelOutlined style={{ color: 'orange', fontSize: '14px' }} />
        }
        style={{ fontSize: '14px' }}
      >
        Tạo loại công việc bằng tệp excel
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <div className="task-type-content content">
        <h3>Loại công việc</h3>

        <div className="task-type-operate">
          <div className="task-type-operate-left">
            {/* Add Task Type */}
            <Button type="primary" onClick={openModalType}>
              Tạo loại công việc
            </Button>
            <FormAddTaskType
              isModalOpenType={isModalOpenType}
              closeModalType={closeModalType}
              onFinishCreateTaskType={onFinishCreateTaskType}
            />

            <FormUploadExcel
              isModalOpenExcel={isModalOpenExcel}
              closeModalExcel={closeModalExcel}
              onFinishCreateTaskTypeExcel={onFinishCreateTaskTypeExcel}
            />

            <Dropdown overlay={menu}>
              <Button type="dashed">
                <DashOutlined />
              </Button>
            </Dropdown>
          </div>

          <div className="task-type-operate-right">
            <Search
              placeholder="Tìm kiếm"
              allowClear
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AddTaskType
