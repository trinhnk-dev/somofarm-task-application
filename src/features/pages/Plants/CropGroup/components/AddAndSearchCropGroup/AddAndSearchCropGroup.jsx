import { Button } from 'antd'
import Search from 'antd/es/input/Search'
import FirstStepAddCropGroup from '../FirstStepAddCropGroup/FirstStepAddCropGroup'
import { useState } from 'react'

const AddAndSearchCropGroup = ({
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
      <div className="crop-group-content content">
        <h3>Vườn</h3>

        <div className="crop-group-operate">
          <div className="crop-group-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm vườn
            </Button>
            <FirstStepAddCropGroup
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              areaByFarm={areaByFarm}
              onFinishCreate={onFinishCreate}
            />
          </div>

          <div className="crop-group-operate-right">
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
export default AddAndSearchCropGroup
