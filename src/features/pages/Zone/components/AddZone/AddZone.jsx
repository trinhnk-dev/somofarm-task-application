import { Button } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import FormAddZone from '../FormAddZone/FormAddZone'

const AddZone = ({
  onFinishCreateZone,
  areaByFarm,
  zoneType,
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
      <div className="zone-content content">
        <h3>Vùng</h3>

        <div className="zone-operate">
          <div className="zone-operate-left">
            <Button type="primary" onClick={openModal}>
              Thêm vùng
            </Button>

            <FormAddZone
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onFinishCreateZone={onFinishCreateZone}
              areaByFarm={areaByFarm}
              zoneType={zoneType}
            />
          </div>

          <div className="zone-operate-right">
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
export default AddZone
