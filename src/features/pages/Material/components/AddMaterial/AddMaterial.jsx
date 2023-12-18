import { Button, Dropdown, Form, Menu } from 'antd'
import { useState } from 'react'
import FormAddMaterial from '../FormAddMaterial/FormAddMaterial'
import Search from 'antd/es/input/Search'
import {
  DashOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  FileExcelOutlined,
} from '@ant-design/icons'
import FormUploadExcel from '../DisplayMaterial/FormUploadExcel'

const AddMaterial = ({
  onFinishCreate,
  farmId,
  handleSearch,
  getMaterialByExcel,
  onFinishCreateMaterialExcel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
        key="downloadMaterial"
        onClick={getMaterialByExcel}
        icon={<DownloadOutlined style={{ color: 'green', fontSize: '14px' }} />}
        style={{ fontSize: '14px' }}
      >
        Tải danh sách công cụ
      </Menu.Item>
      <Menu.Item
        key="uploadMaterial"
        onClick={openModalExcel}
        icon={
          <FileExcelOutlined style={{ color: 'orange', fontSize: '14px' }} />
        }
        style={{ fontSize: '14px' }}
      >
        Thêm công cụ bằng tệp Excel
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <>
        <div className="material-content content">
          <h3>Công cụ</h3>

          <div className="material-operate">
            <div className="material-operate-left">
              <Button type="primary" onClick={openModal}>
                Thêm công cụ
              </Button>

              <FormAddMaterial
                farmId={farmId}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                onFinishCreate={onFinishCreate}
              />

              <Dropdown overlay={menu}>
                <Button type="dashed">
                  <DashOutlined />
                </Button>
              </Dropdown>

              <FormUploadExcel
                isModalOpenExcel={isModalOpenExcel}
                closeModalExcel={closeModalExcel}
                onFinishCreateMaterialExcel={onFinishCreateMaterialExcel}
              />
            </div>

            <div className="material-operate-right">
              <Search
                placeholder="Tìm kiếm"
                allowClear
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </>
    </>
  )
}
export default AddMaterial
