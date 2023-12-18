import { Button } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import FormAddArea from '../FormAddArea/FormAddArea'

const AddArea = ({ onFinishCreate, handleSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="area-content content">
        <h3>Khu vực</h3>

        <div className="area-operate">
          <div className="area-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm khu vực
            </Button>

            <FormAddArea
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onFinishCreate={onFinishCreate}
            />
          </div>

          <div className="area-operate-right">
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
export default AddArea
