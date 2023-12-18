import { useState } from 'react'
import FormAddAnimalType from './FormAddAnimalType'
import { Button } from 'antd'
import Search from 'antd/es/input/Search'

const AddAnimalType = ({ farmId, onFinishCreateAnimalType, handleSearch }) => {
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const openModalType = () => {
    setIsModalOpenType(true)
  }

  const closeModalType = () => {
    setIsModalOpenType(false)
  }

  return (
    <>
      <div className="animal-type-content content">
        <h3>Chăn nuôi</h3>

        <div className="animal-type-operate">
          <div className="animal-type-operate-left">
            {/* Add Animal Type */}
            <Button type="primary" onClick={openModalType}>
              Tạo mới loại vật nuôi
            </Button>
            <FormAddAnimalType
              farmId={farmId}
              isModalOpenType={isModalOpenType}
              closeModalType={closeModalType}
              onFinishCreateAnimalType={onFinishCreateAnimalType}
            />
          </div>

          <div className="animal-type-operate-right">
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
export default AddAnimalType
