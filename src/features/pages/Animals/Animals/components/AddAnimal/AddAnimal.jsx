import { Button } from 'antd'
import React, { useState } from 'react'
import Search from 'antd/es/input/Search'
import FirstStepAddAnimal from '../FirstStepAddAnimal/FirstStepAddAnimal'

const AddAnimal = ({
  areaByFarm,
  onFinishCreateAnimal,
  handleSearch,
  animalTypeActive,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="animal-content content">
        <h3>Chăn nuôi</h3>

        <div className="animal-operate">
          <div className="animal-operate-left">
            {/* Add Animal*/}
            <Button type="primary" onClick={openModal}>
              Thêm vật nuôi
            </Button>
            <FirstStepAddAnimal
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              areaByFarm={areaByFarm}
              onFinishCreateAnimal={onFinishCreateAnimal}
              animalTypeActive={animalTypeActive}
            />
          </div>

          <div className="animal-operate-right">
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
export default AddAnimal
