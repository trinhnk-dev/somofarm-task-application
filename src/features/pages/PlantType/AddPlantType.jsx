import { useState } from 'react'
import FormAddPlantType from './FormAddPlantType'
import { Button } from 'antd'
import Search from 'antd/es/input/Search'

const AddPlantType = ({ farmId, onFinishCreatePlantType, handleSearch }) => {
  const [isModalOpenType, setIsModalOpenType] = useState(false)

  const openModalType = () => {
    setIsModalOpenType(true)
  }

  const closeModalType = () => {
    setIsModalOpenType(false)
  }

  return (
    <>
      <div className="plant-type-content content">
        <h3>Loại cây trồng</h3>

        <div className="plant-type-operate">
          <div className="plant-type-operate-left">
            {/* Add Plant Type */}
            <Button type="primary" onClick={openModalType}>
              Tạo mới loại cây
            </Button>
            <FormAddPlantType
              isModalOpenType={isModalOpenType}
              closeModalType={closeModalType}
              onFinishCreatePlantType={onFinishCreatePlantType}
              farmId={farmId}
            />
          </div>

          <div className="plant-type-operate-right">
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
export default AddPlantType
