import { Button } from 'antd'
import React, { useState } from 'react'
import Search from 'antd/es/input/Search'
import FirstStepAddAnimalGroup from '../FirstStepAddAnimalGroup/FirstStepAddAnimalGroup'

const AddAndSearchAnimalGroup = ({
  areaByFarm,
  onFinishCreate,
  handleSearch,
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
      <div className="animal-group-content content">
        <h3>Chuồng</h3>

        <div className="animal-group-operate">
          <div className="animal-group-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm chuồng
            </Button>

            <FirstStepAddAnimalGroup
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              areaByFarm={areaByFarm}
              onFinishCreate={onFinishCreate}
            />
          </div>

          <div className="animal-group-operate-right">
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
export default AddAndSearchAnimalGroup
