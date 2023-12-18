import { Button, Dropdown, Menu } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import FormAddEmployee from '../FormAddEmployee/FormAddEmployee'
import FormDownloadEffort from '../FormAddEmployee/FormDownloadEffort'
import FormUploadExcel from '../DisplayEmployee/FormUploadExcel'
import {
  DashOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  FileExcelOutlined,
} from '@ant-design/icons'

const AddEmployee = ({
  onFinishCreate,
  handleSearch,
  farmId,
  taskTypeActive,
  getEmployeeByExcel,
  getEmployeeEffort,
  onFinishCreateEmployeeExcel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // effort

  const [isModalOpenEffort, setIsModalOpenEffort] = useState(false)

  const openModalEffort = () => {
    setIsModalOpenEffort(true)
  }

  const closeModalEffort = () => {
    setIsModalOpenEffort(false)
  }

  // download Employee
  const downloadEmployee = () => {
    getEmployeeByExcel()
  }

  // modal upload
  const [isModalOpenExcel, setIsModalOpenExcel] = useState(false)

  const openModalExcel = () => {
    setIsModalOpenExcel(true)
  }

  const closeModalExcel = () => {
    setIsModalOpenExcel(false)
  }

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={downloadEmployee}
        icon={<DownloadOutlined style={{ color: 'green', fontSize: '14px' }} />}
        style={{ fontSize: '14px' }}
      >
        Tải danh sách nhân viên
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={openModalEffort}
        icon={
          <ClockCircleOutlined style={{ color: 'blue', fontSize: '14px' }} />
        }
        style={{ fontSize: '14px' }}
      >
        Tải giờ làm nhân viên
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={openModalExcel}
        icon={
          <FileExcelOutlined style={{ color: 'orange', fontSize: '14px' }} />
        }
        style={{ fontSize: '14px' }}
      >
        Thêm nhân viên bằng tệp Excel
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <div className="employee-content content">
        <h3>Nhân viên</h3>

        <div className="employee-operate">
          <div className="employee-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm nhân viên
            </Button>
            <FormAddEmployee
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onFinishCreate={onFinishCreate}
              farmId={farmId}
              taskTypeActive={taskTypeActive}
            />

            <FormDownloadEffort
              isModalOpenEffort={isModalOpenEffort}
              closeModalEffort={closeModalEffort}
              farmId={farmId}
              getEmployeeEffort={getEmployeeEffort}
            />

            <FormUploadExcel
              isModalOpenExcel={isModalOpenExcel}
              closeModalExcel={closeModalExcel}
              onFinishCreateEmployeeExcel={onFinishCreateEmployeeExcel}
            />

            <Dropdown overlay={menu}>
              <Button type="dashed">
                <DashOutlined />
              </Button>
            </Dropdown>
          </div>

          <div className="employee-operate-right">
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
export default AddEmployee
